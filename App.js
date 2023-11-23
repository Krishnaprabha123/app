/*import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const bmiapp = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBMI] = useState(null);
  const [bmiCategory, setBMICategory] = useState('');

  const calculateBMI = () => {
    if (weight && height) {
      const weightKg = parseFloat(weight);
      const heightM = parseFloat(height) / 100; // convert height from cm to meters
      const bmiValue = (weightKg / (heightM * heightM)).toFixed(2);
      setBMI(bmiValue);

      // Interpret BMI categories
      if (bmiValue < 18.5) {
        setBMICategory('Underweight');
      } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
        setBMICategory('Normal weight');
      } else if (bmiValue >= 25 && bmiValue < 29.9) {
        setBMICategory('Overweight');
      } else {
        setBMICategory('Obese');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Weight (kg):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={weight}
        onChangeText={(text) => setWeight(text)}
      />

      <Text style={styles.label}>Enter Height (cm):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={height}
        onChangeText={(text) => setHeight(text)}
      />

      <Button title="Calculate BMI" onPress={calculateBMI} />

      {bmi && (
        <Text style={styles.result}>
          Your BMI is: {bmi}{'\n'}
          Category: {bmiCategory}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  result: {
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default bmiapp;
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  const [imperialValue, setImperialValue] = useState('');
  const [metricValue, setMetricValue] = useState('');
  const [conversionType, setConversionType] = useState('inchesToCm');

  const convert = () => {
    if (imperialValue) {
      let convertedValue = 0;
      if (conversionType === 'inchesToCm') {
        convertedValue = parseFloat(imperialValue) * 2.54;
      } else if (conversionType === 'feetToMeters') {
        convertedValue = parseFloat(imperialValue) * 0.3048;
      }
      else if (conversionType === 'poundstokg') {
        convertedValue = parseFloat(imperialValue) * 0.4535;
      }
      setMetricValue(convertedValue.toFixed(2));
    } else {
      setMetricValue('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Imperial to Metric Converter</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter value in imperial units"
        value={imperialValue}
        onChangeText={setImperialValue}
        keyboardType="numeric"
      />

      <View style={styles.conversionButtons}>
        <TouchableOpacity
          style={[styles.conversionButton, conversionType === 'inchesToCm' && styles.selectedButton]}
          onPress={() => setConversionType('inchesToCm')}>
          <Text style={styles.conversionButtonText}>Inches to Centimeters</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.conversionButton, conversionType === 'feetToMeters' && styles.selectedButton]}
          onPress={() => setConversionType('feetToMeters')}>
          <Text style={styles.conversionButtonText}>Feet to Meters</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.conversionButton, conversionType === 'poundstokg' && styles.selectedButton]}
          onPress={() => setConversionType('poundstokg')}>
          <Text style={styles.conversionButtonText}>Pounds to Kilograms</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.convertButton} onPress={convert}>
        <Text style={styles.convertButtonText}>Convert</Text>
      </TouchableOpacity>

      {metricValue !== '' && (
        <Text style={styles.resultText}>{imperialValue} imperial units is equal to {metricValue} metric units.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (styles remain the same)
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 18,
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default App;
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const ExpenseTracker = () => {
  const [salary, setSalary] = useState('');
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenses, setExpenses] = useState([]);

  const addExpense = () => {
    if (expenseName.trim() !== '' && expenseAmount.trim() !== '') {
      const amount = parseFloat(expenseAmount);
      if (!isNaN(amount)) {
        const newExpense = {
          id: expenses.length + 1,
          name: expenseName,
          amount,
        };

        setExpenses([...expenses, newExpense]);
        setSalary((prevSalary) => prevSalary - amount);
        setExpenseName('');
        setExpenseAmount('');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Expense Tracker</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter salary"
        keyboardType="numeric"
        value={salary}
        onChangeText={(text) => setSalary(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Expense name"
        value={expenseName}
        onChangeText={(text) => setExpenseName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Expense amount"
        keyboardType="numeric"
        value={expenseAmount}
        onChangeText={(text) => setExpenseAmount(text)}
      />
      <Button title="Add Expense" onPress={addExpense} />
      <Text style={styles.subHeading}>Expenses:</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.expenseItem}>
            {item.name}: ${item.amount.toFixed(2)}
          </Text>
        )}
      />
      <Text style={styles.remainingSalary}>Remaining Salary: ${salary}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  expenseItem: {
    fontSize: 16,
    marginTop: 8,
  },
  remainingSalary: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
});

export default ExpenseTracker;*/
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');

  const addTask = () => {
    if (taskName.trim() !== '') {
      setTasks([...tasks, { name: taskName, done: false }]);
      setTaskName('');
    }
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>To-Do List</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.taskItem}>
            <TouchableOpacity onPress={() => toggleTask(index)}>
              <Text
                style={[
                  styles.taskText,
                  { textDecorationLine: item.done ? 'line-through' : 'none' },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTask(index)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={taskName}
          onChangeText={(text) => setTaskName(text)}
        />
        <Button title="Add Task" onPress={addTask} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  taskText: {
    fontSize: 16,
    marginLeft: 8,
  },
  deleteButton: {
    color: 'red',
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 8,
    paddingHorizontal: 8,
    backgroundColor: '#f2f2f2',
  },
});

export default ToDoList;