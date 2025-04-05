import Employee from "../models/Employee";

 
export const getEmployees = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const employees = await Employee.find().limit(limit * 1).skip((page - 1) * limit);
    const total = await Employee.countDocuments();
    res.json({ employees, totalPages: Math.ceil(total / limit), currentPage: page });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 
export const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 
export const createEmployee = async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 
export const updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 
export const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
export const calculateTax = async (req, res) => {
  try {
    const employees = await Employee.find();
    const slabs = [
      { min: 0, max: 50000, rate: 0.05 },
      { min: 50001, max: 100000, rate: 0.1 },
      { min: 100001, max: Infinity, rate: 0.2 }
    ];

    const taxData = employees.map(employee => {
      const slab = slabs.find(s => employee.salary >= s.min && employee.salary <= s.max);
      return { name: employee.name, salary: employee.salary, tax: employee.salary * slab.rate };
    });

    res.json(taxData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
