# Pocketistic
[![Build Status](https://travis-ci.org/jwoos/web_pocketistic.svg?branch=master)](https://travis-ci.org/jwoos/web_pocketistic)
[![Dependency Status](https://dependencyci.com/github/jwoos/web_pocketistic/badge)](https://dependencyci.com/github/jwoos/web_pocketistic)

## To do
[here](https://github.com/jwoos/web_pocketistic/issues)

## Data models

### session
| column name | type         | description                | constraints |
|-------------|--------------|----------------------------|-------------|
| sid         | varchar      | UUID generated for session | pk          |
| json        | json         | Session data               |             |
| expire      | timestamp(6) | Expire datetime            |             |
| user_id     | int          |                            | fk          |

### user
| column name | type    | description     | constraints |
|-------------|---------|-----------------|-------------|
| username    | varchar | Pocket username | unique      |
| id          | int     |                 | pk          |

### article
| column name    | type      | description     | constraints |
|----------------|-----------|-----------------|-------------|
| user_id        | int       |                 | fk          |
| item_id        | varchar   | An article's id | pk          |
| status         | int       | Read state      |             |
| word_count     | int       | Word count      |             |
| given_url      | varchar   |                 |             |
| resolved_url   | varchar   |                 |             |
| given_title    | varchar   |                 |             |
| resolved_title | varchar   |                 |             |
| excerpt        | varchar   |                 |             |
| time_added     | timestamp |                 |             |
| time_read      | timestamp |                 |             |

### stat
