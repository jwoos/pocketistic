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

### user
| column name | type    | description          | constraints |
|-------------|---------|----------------------|-------------|
| username    | varchar | Pocket username      | unique      |
| id          | int     |                      | pk          |
| hash        | varchar | MD5 hash of username | unique      |
