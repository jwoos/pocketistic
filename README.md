# Pocketistic

## To do
[here](https://github.com/jwoos/web_pocketistic/issues)

## Data models

### session
| column name | type         | description                | constraints |
|-------------|--------------|----------------------------|-------------|
| sid         | varchar      | UUID generated for session | pk          |
| json        | json         | Session data               |             |
| expire      | timestamp(6) | Expire datetime            |             |

### user
| column name | type    | description          | constraints |
|-------------|---------|----------------------|-------------|
| username    | varchar | Pocket username      | unique      |
| id          | int     |                      | pk          |
| hash        | varchar | MD5 hash of username | unique      |

state         string       unread/archive/all
favorite      0 or 1       0/1
tag           string       <TAG_NAME>/_untagged_
contentType   string       article/vidoe/image
sort          string       newest/oldest/title/site
detailType    string       simple/complete
search        string       Only return items whose title or url contain the search string
domain        string       Only return items from a particular domain
since         timestamp    Only return items modified since the given since unix timestamp
count         integer      Only return count number of items
offset        integer      Used only with count; start returning from offset position of results

