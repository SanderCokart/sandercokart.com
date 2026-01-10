#!/usr/bin/env sh
# Load Docker secrets from /run/secrets and export them as env vars.
# For each file in /run/secrets, the environment variable name is the
# filename without its first extension (e.g. APP_KEY.secret -> APP_KEY).

SECRETS_DIR="${SECRETS_DIR:-/run/secrets}"

log() {
	level="$1"
shift
msg="$*"
	# Only emit DEBUG logs when APP_DEBUG is set to true or 1
	if [ "$level" = "DEBUG" ]; then
		case "${APP_DEBUG:-}" in
			1|true|TRUE)
				;; # allow debug
			*)
				return 0
				;;
		esac
	fi
timestamp=$(date -u +'%Y-%m-%dT%H:%M:%SZ' 2>/dev/null || printf '%s' "$(date +'%s')")
printf '%s [%s] %s\n' "$timestamp" "$level" "$msg" >&2
}

# Log process identity for debugging permission issues (only when APP_DEBUG)
case "${APP_DEBUG:-}" in
	1|true|TRUE)
		id_out=$(id 2>/dev/null || true)
		who_out=$(whoami 2>/dev/null || true)
		log "INFO" "Process identity: id='$id_out' whoami='$who_out'"
		;;
esac

if [ ! -d "$SECRETS_DIR" ]; then
	log "WARN" "Secrets directory '$SECRETS_DIR' not found or not a directory."
else
	found=0
	exported_csv=""
	failed_count=0
	for f in "$SECRETS_DIR"/*; do
		[ -f "$f" ] || continue
		found=1
		name=$(basename "$f")
		var=${name%%.*}
		# per-file info not printed unless detailed debug is needed
		if [ ! -r "$f" ]; then
			# show file permissions/ownership for this failing file
			file_info=$(ls -l "$f" 2>/dev/null || printf '%s' "(ls failed)")
			log "ERROR" "Secret file '$f' is not readable by the process. $file_info. Ensure owner:group is 82:82 (alpine www-data) and file is readable by the container user."
			continue
		fi
		# Read file contents (preserve newlines trimmed by shell substitution)
		if value=$(cat "$f" 2>/dev/null); then
			# Export variable even if empty to ensure presence in env
			export "$var"="$value"
			# collect exported var names for summary
			if [ -z "$exported_csv" ]; then
				exported_csv="'$var'"
			else
				exported_csv="$exported_csv, '$var'"
			fi
		else
			# show file permissions/ownership for this failing file
			file_info=$(ls -l "$f" 2>/dev/null || printf '%s' "(ls failed)")
			log "ERROR" "Failed to read secret file '$f' despite read check passing. $file_info. Ensure owner:group is 82:82 (alpine www-data) and file is readable by the container user."
			failed_count=$((failed_count + 1))
		fi
	done
	if [ "$found" -eq 0 ]; then
		log "WARN" "No secret files found in '$SECRETS_DIR'."
	fi
	# summary: if no failures, report all exported env variables
	if [ "$found" -ne 0 ] && [ "$failed_count" -eq 0 ]; then
		if [ -n "$exported_csv" ]; then
			log "INFO" "All env variables were successfully loaded: $exported_csv"
		else
			log "INFO" "No env variables exported (secret files present but empty)."
		fi
	fi
fi


