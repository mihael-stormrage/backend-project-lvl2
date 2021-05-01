#!/bin/bash

########################
# include the magic
########################
__filename=$(readlink -f "$0")
__dirname=$(dirname $__filename)

. $__dirname/demo-magic.sh -n

# hide the evidence
clear

# script
pe "gendiff -h"
cd __fixtures__
pe "gendiff file1.json file2.json"

PROMPT_TIMEOUT=3
wait
echo
