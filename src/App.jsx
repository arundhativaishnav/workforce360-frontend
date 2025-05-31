import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import AdminDashboard from './Pages/Admin-dashboard';
import EmployeeDashboard from './Pages/Employee-dashboard';
import PrivateRoutes from '../utils/PrivateRoutes.jsx';
import RolebasedRoutes from '../utils/RolebasedRoutes.jsx';
import AdminSummary from './components/Dashboard/AdminSummary.jsx';
import DepartmentList from './components/Department/DepartmentList';
import AddDepartment from './components/Department/AddDepartment.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EditDepartment } from './components/Department/EditDepartment.jsx';
import EmployeeList from './components/Employee/employeeList.jsx';
import AddEmployee from './components/Employee/AddEmployee.jsx';
import ViewEmployee from './components/Employee/ViewEmployee.jsx';
import EditEmployee from './components/Employee/EditEmployee.jsx';
import AddSalary from './components/salary/AddSalary.jsx';
import ViewSalary from './components/salary/ViewSalary.jsx';
import SummaryCard from './components/EmployeeDashboard/SummaryCard.jsx';
import LeaveList from './components/Leave/LeaveList.jsx';
import AddLeave from './components/Leave/AddLeave.jsx';
import Setting from './components/EmployeeDashboard/Setting.jsx';
import LeaveTable from './components/Leave/LeaveTable.jsx';
import LeaveDetail from './components/Leave/LeaveDetail.jsx';
import AdminSettings from './components/Dashboard/AdminSettings.jsx';
import AdminAttendance from './components/Dashboard/AdminAttendence.jsx';
import SendNotification from './components/Notifications/SendNotification.jsx';
import NotificationList from './components/Notifications/NotificationList';


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route path="/login" element={<Login />} />

        {/* ✅ Protected Admin Routes */}
        <Route
          path="/AdminDashboard"
          element={
            <PrivateRoutes>
              <RolebasedRoutes requiredRole={['admin']} />
            </PrivateRoutes>
          }
        >
          <Route element={<AdminDashboard />}>
            <Route index element={<AdminSummary />} />
            <Route path="departments" element={<DepartmentList />} />
            <Route path="add-department" element={<AddDepartment />} />
            <Route path="edit-department/:id" element={<EditDepartment />} />
            <Route path="employees" element={<EmployeeList />} />
            <Route path="add-Employee" element={<AddEmployee />} />
            <Route path="employees/:id" element={<ViewEmployee />} />
            <Route path="employees/edit/:id" element={<EditEmployee />} />
            <Route path="employees/salary/:id" element={<ViewSalary />} />
            <Route path="salary/add" element={<AddSalary />} />
            <Route path="leaves" element={< LeaveTable />}/>
            <Route path="leaves/:id" element={<LeaveDetail/>}/>
            <Route path="employees/leaves/:id" element={<LeaveList/>}/>
            <Route path="settings" element={< AdminSettings/>}/>
            <Route path="attendance" element={<AdminAttendance />} />
            <Route path="notifications" element={<SendNotification />} />            
            </Route>
        </Route>

        {/* ✅ Protected Employee Routes */}
        <Route
          path="/EmployeeDashboard"
          element={
            <PrivateRoutes>
              <RolebasedRoutes requiredRole={['Employee']} />
            </PrivateRoutes>
          }
        >
            <Route element={<EmployeeDashboard/>}>
            <Route index element={<SummaryCard />} />
            <Route path="profile/:id" element={<ViewEmployee />} />
            <Route path="leaves/:id" element={<LeaveList/>}/>
            <Route path="add-Leave" element={<AddLeave/>}/>
            <Route path="salary/:id" element={<ViewSalary/>}/>
            <Route path="settings" element={< Setting/>}/>
            <Route path="notifications" element={<NotificationList />} />
            

            


            </Route>
          
        </Route>
      </Routes>

      <ToastContainer />
    </Router>
  );
}

export default App;
