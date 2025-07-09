cd backend || { echo "Backend directory not found"; exit 1; }
python3 app.py > backend.log 2>&1 &
BACKEND_PID=$!
cd ..

cd frontend || { echo "Frontend directory not found"; exit 1; }
npm start > frontend.log 2>&1 &
sleep 2
FRONTEND_PID=$!
cd ..