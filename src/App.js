import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import AboutScreen from './about-screen/about_screen';
import AccountList from "./account-list/index";
import ChangePassword from "./change-password/index";
import ChatList from './chat-box/general-chat';
import ContractDetail from './contract-detail';
import ContractList from './contract-list';
import ContractUser from './contract-list/contract-user';
import CreateProject from "./create-project/index";
import CreateSchedule from './create-schedule';
import CustomerList from './customer-list';
import DesignerDetail from './designer-detail';
import DesignerList from './designer-list';
import DesignerSchedule from './designer-schedule';
import EditPasswordOtp from './edit-password-otp';
import HomePage from "./homePage/index";
import './index.css';
import Login from "./login/index";
import PoliciesService from './policies-service';
import Profile from './profile';
import ListProject from "./projects_category/list-project";
import ProjectValue from "./projects_category/project-value";
import RegisterCustomer from "./register-customer/index";
import RegisterDesigner from './register-designer/index';
import Register from "./register/index";
import ScheduleList from './schedule-list';
import ProjectServices from './service-list/project-services';
import Service1 from './service-list/service-01';
import Service2 from './service-list/service-02';
import Service3 from './service-list/service-03';
import StaffList from './staff-list';
import UserSchedule from './user-schedule/UserSchedule';
import WorkingProject from './working-project';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/register-customer" element={<RegisterCustomer />} />
        <Route path="/register-designer" element={<RegisterDesigner />} />
        <Route path="/edit-password" element={<ChangePassword />} />
        <Route path="/edit-password-otp" element={<EditPasswordOtp />} />
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/list-user-admin" element={<AccountList />} />
        <Route path="/list-user-staff" element={<StaffList />} />
        <Route path="/list-user-designer" element={<DesignerList />} />
        <Route path="/cv/:designerId" element={<DesignerDetail />} />
        <Route path="/list-user-customer" element={<CustomerList />} />
        <Route path="/list-schedule" element={<ScheduleList />} />
        <Route path="/list-contract" element={<ContractList />} />
        <Route path="/contract-user" element={<ContractUser />} />
        <Route path="/contract/:contract_id" element={<ContractDetail />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about-screen" element={<AboutScreen />} />
        <Route path="/project-list/:project_type" element={<ListProject />} />
        <Route path="/project/:project_id" element={<ProjectValue />} />
        <Route path="/service" element={<ProjectServices />} />
        <Route path="/service/01" element={<Service1 />} />
        <Route path="/service/02" element={<Service2 />} />
        <Route path="/service/03" element={<Service3 />} />
        <Route path="/working-profile" element={<WorkingProject />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/schedule/:designer_id" element={<DesignerSchedule />} />
        <Route path="/create-schedule" element={<CreateSchedule />} />
        <Route path="/user-schedule" element={<UserSchedule />} />
        <Route path="/list-chatbox/:staff_id" element={<ChatList />} />
        <Route path="/policiesandtermsofservice" element={<PoliciesService />} />

      </Routes>
    </BrowserRouter>
  );

}

export default App;
