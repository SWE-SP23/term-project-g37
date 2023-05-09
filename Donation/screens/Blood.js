import React, { useState, useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';

// api client
import axios from 'axios';

const Table = ({ data }) => {
  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', padding: 10 }}>
      <Text style={{ flex: 1 }}>{item.date}</Text>
      <Text style={{ flex: 1 }}>{item.bloodType}</Text>
      <Text style={{ flex: 1 }}>{item.location}</Text>
      <Text style={{ flex: 1 }}>{item.number}</Text>
    </View>
  );

  return (
    <View>
      <View style={{ flexDirection: 'row', padding: 60 }}>
        <Text style={{ flex: 1, fontWeight: 'bold' }}>Date</Text>
        <Text style={{ flex: 1, fontWeight: 'bold' }}>Blood Type</Text>
        <Text style={{ flex: 1, fontWeight: 'bold' }}>Location</Text>
        <Text style={{ flex: 1, fontWeight: 'bold' }}>Number</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
};

const App = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://192.168.1.2:3000/blood/bloods';
        const response = await axios.get(url);
        const { data, status } = response.data;

        if (status === 'SUCCESS') {
          setTableData(data);
        } else {
          console.log('Error:', response);
        }
      } catch (error) {
        console.log('An error occurred. Check your network and try again.');
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Table data={tableData} />
    </View>
  );
};

export default App;