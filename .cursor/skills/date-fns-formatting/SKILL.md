---
name: date-fns-formatting
description: Complete reference for date-fns format patterns and tokens with examples
---

# date-fns Format Patterns Reference

This skill provides the complete reference table for date-fns format patterns and tokens, extracted from the official date-fns v4.1.0 documentation.

## Format Pattern Table

| Unit | Pattern | Result examples | Notes |
|------|---------|-----------------|-------|
| Era | G..GGG | AD, BC |  |
|  | GGGG | Anno Domini, Before Christ | 2 |
|  | GGGGG | A, B |  |
| Calendar year | y | 44, 1, 1900, 2017 | 5 |
|  | yo | 44th, 1st, 0th, 17th | 5,7 |
|  | yy | 44, 01, 00, 17 | 5 |
|  | yyy | 044, 001, 1900, 2017 | 5 |
|  | yyyy | 0044, 0001, 1900, 2017 | 5 |
|  | yyyyy | ... | 3,5 |
| Local week-numbering year | Y | 44, 1, 1900, 2017 | 5 |
|  | Yo | 44th, 1st, 1900th, 2017th | 5,7 |
|  | YY | 44, 01, 00, 17 | 5,8 |
|  | YYY | 044, 001, 1900, 2017 | 5 |
|  | YYYY | 0044, 0001, 1900, 2017 | 5,8 |
|  | YYYYY | ... | 3,5 |
| ISO week-numbering year | R | -43, 0, 1, 1900, 2017 | 5,7 |
|  | RR | -43, 00, 01, 1900, 2017 | 5,7 |
|  | RRR | -043, 000, 001, 1900, 2017 | 5,7 |
|  | RRRR | -0043, 0000, 0001, 1900, 2017 | 5,7 |
|  | RRRRR | ... | 3,5,7 |
| Extended year | u | -43, 0, 1, 1900, 2017 | 5 |
|  | uu | -43, 01, 1900, 2017 | 5 |
|  | uuu | -043, 001, 1900, 2017 | 5 |
|  | uuuu | -0043, 0001, 1900, 2017 | 5 |
|  | uuuuu | ... | 3,5 |
| Quarter (formatting) | Q | 1, 2, 3, 4 |  |
|  | Qo | 1st, 2nd, 3rd, 4th | 7 |
|  | QQ | 01, 02, 03, 04 |  |
|  | QQQ | Q1, Q2, Q3, Q4 |  |
|  | QQQQ | 1st quarter, 2nd quarter, ... | 2 |
|  | QQQQQ | 1, 2, 3, 4 | 4 |
| Quarter (stand-alone) | q | 1, 2, 3, 4 |  |
|  | qo | 1st, 2nd, 3rd, 4th | 7 |
|  | qq | 01, 02, 03, 04 |  |
|  | qqq | Q1, Q2, Q3, Q4 |  |
|  | qqqq | 1st quarter, 2nd quarter, ... | 2 |
|  | qqqqq | 1, 2, 3, 4 | 4 |
| Month (formatting) | M | 1, 2, ..., 12 |  |
|  | Mo | 1st, 2nd, ..., 12th | 7 |
|  | MM | 01, 02, ..., 12 |  |
|  | MMM | Jan, Feb, ..., Dec |  |
|  | MMMM | January, February, ..., December | 2 |
|  | MMMMM | J, F, ..., D |  |
| Month (stand-alone) | L | 1, 2, ..., 12 |  |
|  | Lo | 1st, 2nd, ..., 12th | 7 |
|  | LL | 01, 02, ..., 12 |  |
|  | LLL | Jan, Feb, ..., Dec |  |
|  | LLLL | January, February, ..., December | 2 |
|  | LLLLL | J, F, ..., D |  |
| Local week of year | w | 1, 2, ..., 53 |  |
|  | wo | 1st, 2nd, ..., 53th | 7 |
|  | ww | 01, 02, ..., 53 |  |
| ISO week of year | I | 1, 2, ..., 53 | 7 |
|  | Io | 1st, 2nd, ..., 53th | 7 |
|  | II | 01, 02, ..., 53 | 7 |
| Day of month | d | 1, 2, ..., 31 |  |
|  | do | 1st, 2nd, ..., 31st | 7 |
|  | dd | 01, 02, ..., 31 |  |
| Day of year | D | 1, 2, ..., 365, 366 | 9 |
|  | Do | 1st, 2nd, ..., 365th, 366th | 7 |
|  | DD | 01, 02, ..., 365, 366 | 9 |
|  | DDD | 001, 002, ..., 365, 366 |  |
|  | DDDD | ... | 3 |
| Day of week (formatting) | E..EEE | Mon, Tue, Wed, ..., Sun |  |
|  | EEEE | Monday, Tuesday, ..., Sunday | 2 |
|  | EEEEE | M, T, W, T, F, S, S |  |
|  | EEEEEE | Mo, Tu, We, Th, Fr, Sa, Su |  |
| ISO day of week (formatting) | i | 1, 2, 3, ..., 7 | 7 |
|  | io | 1st, 2nd, ..., 7th | 7 |
|  | ii | 01, 02, ..., 07 | 7 |
|  | iii | Mon, Tue, Wed, ..., Sun | 7 |
|  | iiii | Monday, Tuesday, ..., Sunday | 2,7 |
|  | iiiii | M, T, W, T, F, S, S | 7 |
|  | iiiiii | Mo, Tu, We, Th, Fr, Sa, Su | 7 |
| Local day of week (formatting) | e | 2, 3, 4, ..., 1 |  |
|  | eo | 2nd, 3rd, ..., 1st | 7 |
|  | ee | 02, 03, ..., 01 |  |
|  | eee | Mon, Tue, Wed, ..., Sun |  |
|  | eeee | Monday, Tuesday, ..., Sunday | 2 |
|  | eeeee | M, T, W, T, F, S, S |  |
|  | eeeeee | Mo, Tu, We, Th, Fr, Sa, Su |  |
| Local day of week (stand-alone) | c | 2, 3, 4, ..., 1 |  |
|  | co | 2nd, 3rd, ..., 1st | 7 |
|  | cc | 02, 03, ..., 01 |  |
|  | ccc | Mon, Tue, Wed, ..., Sun |  |
|  | cccc | Monday, Tuesday, ..., Sunday | 2 |
|  | ccccc | M, T, W, T, F, S, S |  |
|  | cccccc | Mo, Tu, We, Th, Fr, Sa, Su |  |
| AM, PM | a..aa | AM, PM |  |
|  | aaa | am, pm |  |
|  | aaaa | a.m., p.m. | 2 |
|  | aaaaa | a, p |  |
| AM, PM, noon, midnight | b..bb | AM, PM, noon, midnight |  |
|  | bbb | am, pm, noon, midnight |  |
|  | bbbb | a.m., p.m., noon, midnight | 2 |
|  | bbbbb | a, p, n, mi |  |
| Flexible day period | B..BBB | at night, in the morning, ... |  |
|  | BBBB | at night, in the morning, ... | 2 |
|  | BBBBB | at night, in the morning, ... |  |
| Hour [1-12] | h | 1, 2, ..., 11, 12 |  |
|  | ho | 1st, 2nd, ..., 11th, 12th | 7 |
|  | hh | 01, 02, ..., 11, 12 |  |
| Hour [0-23] | H | 0, 1, 2, ..., 23 |  |
|  | Ho | 0th, 1st, 2nd, ..., 23rd | 7 |
|  | HH | 00, 01, 02, ..., 23 |  |
| Hour [0-11] | K | 1, 2, ..., 11, 0 |  |
|  | Ko | 1st, 2nd, ..., 11th, 0th | 7 |
|  | KK | 01, 02, ..., 11, 00 |  |
| Hour [1-24] | k | 24, 1, 2, ..., 23 |  |
|  | ko | 24th, 1st, 2nd, ..., 23rd | 7 |
|  | kk | 24, 01, 02, ..., 23 |  |
| Minute | m | 0, 1, ..., 59 |  |
|  | mo | 0th, 1st, ..., 59th | 7 |
|  | mm | 00, 01, ..., 59 |  |
| Second | s | 0, 1, ..., 59 |  |
|  | so | 0th, 1st, ..., 59th | 7 |
|  | ss | 00, 01, ..., 59 |  |
| Fraction of second | S | 0, 1, ..., 9 |  |
|  | SS | 00, 01, ..., 99 |  |
|  | SSS | 000, 001, ..., 999 |  |
|  | SSSS | ... | 3 |
| Timezone (ISO-8601 w/ Z) | X | -08, +0530, Z |  |
|  | XX | -0800, +0530, Z |  |
|  | XXX | -08:00, +05:30, Z |  |
|  | XXXX | -0800, +0530, Z, +123456 | 2 |
|  | XXXXX | -08:00, +05:30, Z, +12:34:56 |  |
| Timezone (ISO-8601 w/o Z) | x | -08, +0530, +00 |  |
|  | xx | -0800, +0530, +0000 |  |
|  | xxx | -08:00, +05:30, +00:00 | 2 |
|  | xxxx | -0800, +0530, +0000, +123456 |  |
|  | xxxxx | -08:00, +05:30, +00:00, +12:34:56 |  |
| Timezone (GMT) | O...OOO | GMT-8, GMT+5:30, GMT+0 |  |
|  | OOOO | GMT-08:00, GMT+05:30, GMT+00:00 | 2 |
| Timezone (specific non-locat.) | z...zzz | GMT-8, GMT+5:30, GMT+0 | 6 |
|  | zzzz | GMT-08:00, GMT+05:30, GMT+00:00 | 2,6 |
| Seconds timestamp | t | 512969520 | 7 |
|  | tt | ... | 3,7 |
| Milliseconds timestamp | T | 512969520900 | 7 |
|  | TT | ... | 3,7 |
| Long localized date | P | 04/29/1453 | 7 |
|  | PP | Apr 29, 1453 | 7 |
|  | PPP | April 29th, 1453 | 7 |
|  | PPPP | Friday, April 29th, 1453 | 2,7 |
| Long localized time | p | 12:00 AM | 7 |
|  | pp | 12:00:00 AM | 7 |
|  | ppp | 12:00:00 AM GMT+2 | 7 |
|  | pppp | 12:00:00 AM GMT+02:00 | 2,7 |
| Combination of date and time | Pp | 04/29/1453, 12:00 AM | 7 |
|  | PPpp | Apr 29, 1453, 12:00:00 AM | 7 |
|  | PPPppp | April 29th, 1453 at ... | 7 |
|  | PPPPpppp | Friday, April 29th, 1453 at ... | 2,7 |

## Notes

1. **Notes column** refers to additional information about the pattern behavior:
   - **2**: The result may vary by locale
   - **3**: The pattern expands to as many digits as needed
   - **4**: The result is numeric
   - **5**: The pattern handles negative years
   - **6**: The result may vary by time zone
   - **7**: The pattern uses ordinal numbers
   - **8**: The pattern handles years before 100 AD
   - **9**: The pattern includes leap years

## Common Format Combinations

| Use Case | Format | Example Output |
|----------|--------|----------------|
| Article/blog date | `MMMM d, yyyy` | January 1, 2024 |
| Time tooltip | `PPPP p` | Friday, April 29th, 1453 12:00 AM |
| Full datetime | `PPPPpppp` | Friday, April 29th, 1453 at 12:00:00 AM GMT+02:00 |
| ISO-like format | `yyyy-MM-dd HH:mm:ss` | 2024-01-01 14:30:00 |
| Short date | `MMM d, yyyy` | Jan 1, 2024 |
| Time only | `p` | 12:00 AM |

## Usage Example

```typescript
import { format } from 'date-fns';

const date = new Date();

// Article display date
format(date, 'MMMM d, yyyy'); // "January 1, 2024"

// Tooltip with full details
format(date, 'PPPP p'); // "Monday, January 1st, 2024 2:30 PM"
```

## References

- [date-fns format documentation](https://date-fns.org/v4.1.0/docs/format)
- [Unicode Technical Standard #35](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table)