red=`tput setaf 1`
green=`tput setaf 2`
yellow=`tput setaf 3`
purple=`tput setaf 5`
reset=`tput sgr0`

basePath='/Users/wmrsmile2018/projects/general/connect/back/sql'

echo "${yellow}insert role${green}"
PGGSSENCMODE=disable psql -h localhost -d wmrsmile2018 -U wmrsmile2018 -p 5432 -a -q -f "${basePath}/roleInsert.test.sql"
echo "${yellow}insert priority${green}"
PGGSSENCMODE=disable psql -h localhost -d wmrsmile2018 -U wmrsmile2018 -p 5432 -a -q -f "${basePath}/priority.test.sql"
echo "${yellow}insert linkType${green}"
PGGSSENCMODE=disable psql -h localhost -d wmrsmile2018 -U wmrsmile2018 -p 5432 -a -q -f "${basePath}/linkType.test.sql"
echo "${yellow}insert filterKey${green}"
PGGSSENCMODE=disable psql -h localhost -d wmrsmile2018 -U wmrsmile2018 -p 5432 -a -q -f "${basePath}/filter.test.sql"
