# Pocketistic
## To do
- migrations
- fix up models

## Data models

### session
| column name | type         | description                | constraints |
|-------------|--------------|----------------------------|-------------|
| sid         | varchar      | UUID generated for session | pk          |
| json        | json         | Session data               |             |
| expire      | timestamp(6) | Expire datetime            |             |
| username    | varchar      | Pocket username            | fk          |

### user
| column name | type    | description     | constraints |
|-------------|---------|-----------------|-------------|
| username    | varchar | Pocket username | pk          |

### article
| column name    | type      | description     | constraints |
|----------------|-----------|-----------------|-------------|
| username       | varchar   | Pocket username | fk          |
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
