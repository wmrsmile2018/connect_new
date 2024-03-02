red=`tput setaf 1`
green=`tput setaf 2`
yellow=`tput setaf 3`
purple=`tput setaf 5`
reset=`tput sgr0`

basePath='/Users/wmrsmile2018/projects/general/connect/back/sql'

echo "${yellow}insert announcementPhoto${green}"
PGGSSENCMODE=disable psql -h localhost -d wmrsmile2018 -U wmrsmile2018 -p 5432 -a -q -f "${basePath}/announcementPhoto.test.sql"
echo "${yellow}insert favorite${green}"
PGGSSENCMODE=disable psql -h localhost -d wmrsmile2018 -U wmrsmile2018 -p 5432 -a -q -f "${basePath}/favorite.test.sql"
echo "${yellow}insert markedCard${green}"
PGGSSENCMODE=disable psql -h localhost -d wmrsmile2018 -U wmrsmile2018 -p 5432 -a -q -f "${basePath}/markedCard.test.sql"
echo "${yellow}insert userAnnouncement${green}"
PGGSSENCMODE=disable psql -h localhost -d wmrsmile2018 -U wmrsmile2018 -p 5432 -a -q -f "${basePath}/userAnnouncement.test.sql"
echo "${yellow}insert userFilter${green}"
PGGSSENCMODE=disable psql -h localhost -d wmrsmile2018 -U wmrsmile2018 -p 5432 -a -q -f "${basePath}/userFilter.test.sql"

echo "${yellow}insert userLinkType${green}"
PGGSSENCMODE=disable psql -h localhost -d wmrsmile2018 -U wmrsmile2018 -p 5432 -a -q -f "${basePath}/userLinkType.test.sql"
echo "${yellow}insert userPhoto${green}"
PGGSSENCMODE=disable psql -h localhost -d wmrsmile2018 -U wmrsmile2018 -p 5432 -a -q -f "${basePath}/userPhoto.test.sql"
