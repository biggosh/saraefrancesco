#!/bin/bash

echo "======================================"
echo "Sara & Francesco Wedding Website"
echo "Django Server Startup"
echo "======================================"
echo ""

# Check if migrations need to be run
echo "Checking for pending migrations..."
python3 manage.py migrate --check 2>&1 | grep -q "No migrations to apply"
if [ $? -ne 0 ]; then
    echo "Running migrations..."
    python3 manage.py migrate
fi

echo ""
echo "Starting Django development server..."
echo "Access the website at: http://localhost:8000/"
echo "Access admin panel at: http://localhost:8000/admin/"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python3 manage.py runserver
