#!/bin/sh

set -e

if [ ! -z ${METRICQ_WIZARD_BACKEND} ]; then
    echo "{ \"backend\": \"${METRICQ_WIZARD_BACKEND}\" }" > /usr/share/nginx/html/configuration.json
fi

exit 0
