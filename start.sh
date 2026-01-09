#!/bin/bash

# --- Colors ---
BOLD='\033[1m'
DIM='\033[2m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
RED='\033[0;31m'
RESET='\033[0m'

# --- UI Helpers ---
log_header() {
    echo -e "\n${BOLD}${BLUE}=== $1 ===${RESET}"
}

log_info() {
    echo -e "${CYAN}i${RESET} $1"
}

log_success() {
    echo -e "${GREEN}✓${RESET} $1"
}

log_warn() {
    echo -e "${RED}!${RESET} $1"
}

log_dim() {
    echo -e "${DIM}$1${RESET}"
}

# Ensure the script is run with sudo
if [ "$EUID" -ne 0 ]; then
  log_warn "This script must be run as sudo."
  log_info "Re-running with sudo..."
  exec sudo "$0" "$@"
fi

# Clear screen for a fresh start
clear

echo -e "${BOLD}${CYAN}"
echo "  ____    _    _   _ ____  _____ ____       ____ _     ___ "
echo " / ___|  / \  | \ | |  _ \| ____|  _ \     / ___| |   |_ _| "
echo " \___ \ / _ \ |  \| | | | |  _| | |_) |   | |   | |    | |  "
echo "  ___) / ___ \| |\  | |_| | |___|  _ <    | |___| |___ | |  "
echo " |____/_/   \_\_| \_|____/|_____|_| \_\    \____|_____|___| "
echo -e "         ${DIM}SANDER CLI v1.0${RESET}\n"

# --- Secret Management ---

collect_secrets() {
    secrets_list=()
    for app_dir in apps/*; do
        if [ -d "$app_dir" ]; then
            local app_name=$(basename "$app_dir")
            local secrets_dir="$app_dir/secrets"
            local examples_dir="$secrets_dir/examples"
            
            # Ensure .env exists
            if [ -f "$app_dir/.env.example" ] && [ ! -f "$app_dir/.env" ]; then
                cp "$app_dir/.env.example" "$app_dir/.env"
                log_success "Created .env for $app_name"
            fi

            if [ -d "$examples_dir" ]; then
                for example_file in "$examples_dir"/*; do
                    [ -f "$example_file" ] || continue
                    filename=$(basename "$example_file")
                    target_name="${filename%.example}"
                    target_name="${target_name%.secret}"
                    target_name="${target_name}.secret"
                    target_path="$secrets_dir/$target_name"
                    
                    status="SET"
                    if [ ! -s "$target_path" ]; then status="UNSET"; fi
                    
                    secrets_list+=("$app_name|$target_name|$target_path|$status|$example_file")
                done
            fi
        fi
    done
    
    # Special: APP_KEY for api
    if [ -d "apps/api" ]; then
        local app_key_path="apps/api/secrets/APP_KEY.secret"
        local status="SET"
        if [ ! -s "$app_key_path" ]; then status="UNSET"; fi
        
        local found=0
        for item in "${secrets_list[@]}"; do
            if [[ "$item" == *"APP_KEY.secret"* ]]; then
                found=1
                break
            fi
        done
        
        if [ $found -eq 0 ]; then
            secrets_list+=("api|APP_KEY.secret|$app_key_path|$status|")
        fi
    fi

    # Sort the list: App name first, then Secret name
    readarray -t secrets_list < <(printf '%s\n' "${secrets_list[@]}" | sort)
}

reset_secrets_task() {
    log_warn "This will delete ALL .secret files in all app directories."
    printf "${YELLOW}  ? ${RESET}Are you sure you want to proceed? (y/N): "
    read -r confirm
    
    if [[ "$confirm" == "y" || "$confirm" == "Y" ]]; then
        find apps -name "*.secret" -type f -delete
        log_success "All .secret files have been removed."
        sleep 1
    else
        log_info "Operation cancelled."
        sleep 1
    fi
}

display_secrets_table() {
    local selected_idx=$1
    clear
    log_header "Secret Management"
    printf "${BOLD}   %-12s %-25s %-25s %-10s${RESET}\n" "App" "Name" "Value" "Status"
    echo -e "${DIM}--------------------------------------------------------------------------------${RESET}"
    
    local i=0
    for item in "${secrets_list[@]}"; do
        IFS='|' read -r app name path status example_path <<< "$item"
        
        display_name=$(echo "$name" | sed 's/\.secret$//')
        
        local value="-"
        if [ "$status" == "SET" ] && [ -f "$path" ]; then
            value=$(cat "$path")
            if [ ${#value} -gt 22 ]; then
                value="${value:0:19}..."
            fi
        fi

        local status_color=$GREEN
        if [ "$status" == "UNSET" ]; then
            status_color=$RED
        fi
        
        if [ "$i" -eq "$selected_idx" ]; then
            # Highlighted row
            printf "${BOLD}${BLUE}>${RESET}  "
            printf "${BOLD}%-12s %-25s %-25s ${status_color}%-10s${RESET}\n" "$app" "$display_name" "$value" "$status"
        else
            printf "   "
            printf "%-12s %-25s %-25s ${status_color}%-10s${RESET}\n" "$app" "$display_name" "$value" "$status"
        fi
        ((i++))
    done
    echo -e "${DIM}--------------------------------------------------------------------------------${RESET}"
}

edit_secret() {
    local idx=$1
    IFS='|' read -r app name path status example_path <<< "${secrets_list[$idx]}"
    display_name=$(echo "$name" | sed 's/\.secret$//')
    
    echo -e "\n${BOLD}Editing $display_name ($app)${RESET}"

    if [ -n "$example_path" ] && [ -f "$example_path" ]; then
        local hint=$(cat "$example_path")
        echo -e "${DIM}Hint: $hint${RESET}"
    fi
    
    local current_val=""
    [ -f "$path" ] && current_val=$(cat "$path")
    
    if [[ "$name" == "APP_KEY.secret" && -z "$current_val" ]]; then
        echo -e "${DIM}This is a Laravel APP_KEY. Leave empty to auto-generate if possible.${RESET}"
    fi

    if [[ "$name" == "DASHBOARD_CREDENTIALS.secret" ]]; then
        echo -e "${DIM}Entering a value here will automatically hash it as 'admin' user password.${RESET}"
        echo -e "${DIM}If you want a custom username, enter 'user:password'.${RESET}"
    fi

    printf "${YELLOW}  ? ${RESET}New value ${DIM}(current: ${current_val:-'UNSET'}, 'c' to cancel, 'u' to unset)${RESET}: "
    read new_val
    
    [[ "$new_val" == "c" ]] && return

    if [[ "$new_val" == "u" ]]; then
        rm -f "$path"
        log_success "Unset $name"
        sleep 1
        return
    fi

    if [[ "$name" == "DASHBOARD_CREDENTIALS.secret" && -n "$new_val" ]]; then
        if [[ "$new_val" != *":"* ]]; then
            log_info "Hashing password for user 'admin'..."
            new_val="admin:$(openssl passwd -6 "$new_val")"
        else
            user=$(echo "$new_val" | cut -d':' -f1)
            pass=$(echo "$new_val" | cut -d':' -f2-)
            log_info "Hashing password for user '$user'..."
            new_val="$user:$(openssl passwd -6 "$pass")"
        fi
    fi
    
    if [[ "$name" == "APP_KEY.secret" && -z "$new_val" && -z "$current_val" ]]; then
        log_info "Generating APP_KEY via artisan..."
        if [ -f "apps/api/artisan" ]; then
            new_val=$(cd apps/api && php artisan key:generate --show --no-ansi 2>/dev/null)
        else
            log_warn "apps/api/artisan not found."
            return
        fi
    fi
    
    final_val=${new_val:-$current_val}
    
    if [ -n "$final_val" ]; then
        mkdir -p "$(dirname "$path")"
        echo -n "$final_val" > "$path"
        chmod 400 "$path"
        chown www-data:www-data "$path"
        log_success "Saved $name"
    else
        log_warn "No value set."
    fi
    sleep 1
}

setup_secrets_task() {
    local selected=0
    collect_secrets
    
    # Hide cursor
    tput civis
    # Ensure cursor is restored on exit
    trap "tput cnorm; exit" INT TERM EXIT

    while true; do
        display_secrets_table "$selected"
        
        echo -e "\n${BOLD}Navigation:${RESET}"
        echo -e "  ${CYAN}↑/↓${RESET}   Move selection"
        echo -e "  ${CYAN}ENTER${RESET} Select to edit"
        echo -e "  ${CYAN}q${RESET}     Finish and continue"

        # Read keys (handling escape sequences for arrows)
        read -rsn1 key
        if [[ $key == $'\e' ]]; then
            read -rsn2 -t 0.1 key # Read the Rest of the sequence
            if [[ $key == "[A" ]]; then # Up
                ((selected--))
                [ $selected -lt 0 ] && selected=$((${#secrets_list[@]} - 1))
            elif [[ $key == "[B" ]]; then # Down
                ((selected++))
                [ $selected -ge ${#secrets_list[@]} ] && selected=0
            fi
        elif [[ $key == "" ]]; then # Enter key
            tput cnorm # Show cursor for input
            edit_secret "$selected"
            tput civis # Hide it again
            collect_secrets # Refresh list after edit
        elif [[ $key == "q" ]]; then
            break
        fi
    done

    # Restore cursor and clear trap
    tput cnorm
    trap - INT TERM EXIT
}

start_docker_task() {
    log_header "Docker Services"
    log_info "Starting: api, redis, proxy, db, codehouse..."
    docker compose up api redis proxy db codehouse -d
    log_success "Services initiated in background."
}

# --- Main Menu ---

display_main_menu() {
    local selected=$1
    clear
    echo -e "${BOLD}${CYAN}"
    echo "  ____    _    _   _ ____  _____ ____       ____ _     ___ "
    echo " / ___|  / \  | \ | |  _ \| ____|  _ \     / ___| |   |_ _| "
    echo " \___ \ / _ \ |  \| | | | |  _| | |_) |   | |   | |    | |  "
    echo "  ___) / ___ \| |\  | |_| | |___|  _ <    | |___| |___ | |  "
    echo " |____/_/   \_\_| \_|____/|_____|_| \_\    \____|_____|___| "
    echo -e "         ${DIM}SANDER CLI v1.0${RESET}\n"

    local options=("Full Setup (Secrets + Docker)" "Secrets Setup/Review" "Start Docker Services" "Debug: Reset All Secrets" "Exit")
    
    for i in "${!options[@]}"; do
        if [ "$i" -eq "$selected" ]; then
            echo -e "${BOLD}${BLUE}>${RESET} ${BOLD}${options[$i]}${RESET}"
        else
            echo -e "  ${options[$i]}"
        fi
    done
}

main() {
    local selected=0
    local options_count=5
    
    # Hide cursor
    tput civis
    trap "tput cnorm; exit" INT TERM EXIT

    while true; do
        display_main_menu "$selected"
        
        read -rsn1 key
        if [[ $key == $'\e' ]]; then
            read -rsn2 -t 0.1 key
            if [[ $key == "[A" ]]; then # Up
                ((selected--))
                [ $selected -lt 0 ] && selected=$((options_count - 1))
            elif [[ $key == "[B" ]]; then # Down
                ((selected++))
                [ $selected -ge $options_count ] && selected=0
            fi
        elif [[ $key == "" ]]; then # Enter
            case $selected in
                0)
                    setup_secrets_task
                    start_docker_task
                    break
                    ;;
                1)
                    setup_secrets_task
                    ;;
                2)
                    start_docker_task
                    break
                    ;;
                3)
                    tput cnorm
                    reset_secrets_task
                    tput civis
                    ;;
                4)
                    log_info "Exiting..."
                    break
                    ;;
            esac
        fi
    done

    tput cnorm
    trap - INT TERM EXIT
    
    echo -e "\n${BOLD}${GREEN}✔ Deployment Task Completed!${RESET}"
    echo -e "${DIM}--- Done ---${RESET}\n"
}

main
