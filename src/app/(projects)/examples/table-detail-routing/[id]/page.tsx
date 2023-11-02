import { NextPage } from 'next';
import { Employees } from "@/app/data/employees";
import { EmployeeDetail as EmployeeDetailComponent } from './component';

export interface EmployeeDetailProps {
  params: { id: string };
}

export async function generateStaticParams() {
  return Employees.map((employee) => (
    { id: employee.employeeID }
  ));
}

const EmployeeDetail: NextPage<EmployeeDetailProps> = ({ params: { id } }) => {
  return (
    <EmployeeDetailComponent id={id} />
  )
};

export default EmployeeDetail;
