red=`tput setaf 1`
green=`tput setaf 2`
yellow=`tput setaf 3`
purple=`tput setaf 5`
reset=`tput sgr0`

basePath='/Users/wmrsmile2018/projects/general/connect/back/sql/test'

echo "${yellow}insert user${green}"
PGGSSENCMODE=disable psql -h localhost -d wmrsmile2018 -U wmrsmile2018 -p 5432 -a -q -f "${basePath}/user.test.sql"
echo "${yellow}insert photo${green}"
PGGSSENCMODE=disable psql -h localhost -d wmrsmile2018 -U wmrsmile2018 -p 5432 -a -q -f "${basePath}/photo.test.sql"
echo "${yellow}insert announcement${green}"
PGGSSENCMODE=disable psql -h localhost -d wmrsmile2018 -U wmrsmile2018 -p 5432 -a -q -f "${basePath}/announcement.test.sql"
