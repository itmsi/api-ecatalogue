#!/bin/bash

# Test CURL untuk item catalog engine dengan CSV

echo "=== Testing Item Catalog Engine Create with CSV ==="
echo ""

curl -X 'POST' \
  'http://localhost:9549/api/catalogs/item_catalog_engine/create' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZjBiNTcyNTgtNWYzMy00ZTAzLTgxZjctY2Q3MGQ4MzNiNWM1IiwiZW1wbG95ZWVfaWQiOiJmMGI1NzI1OC01ZjMzLTRlMDMtODFmNy1jZDcwZDgzM2I1YzUiLCJpYXQiOjE3NTk5OTI4MzcsImV4cCI6MTc2MDA3OTIzNywiYXVkIjoic3RyaW5nIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIn0.NvTfgbzy2WUhBeYd-jrt9nWl1gDwRwE7wX09BHOG0vI' \
  -H 'Content-Type: multipart/form-data' \
  -F 'name_pdf=Engine Catalog 2024' \
  -F 'engine_id=1cd67a84-c5d1-46ff-b5c2-f85a70512227' \
  -F 'type_engine_id=dec6d87f-ea6a-4a75-a11c-bda336c08275' \
  -F 'file_csv=@/Users/falaqmsi/Nextcloud/Falaq-BE/template_import_csv_epc.csv;type=text/csv' \
  -F 'use_csv=true'

echo ""
echo ""
echo "=== Test Complete ==="

