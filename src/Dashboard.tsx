// Dashboard.tsx
import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { parseData } from "./dataUtils";
import { DataItem } from "./types";
import SearchForm from "./SearchForm";

const Dashboard = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    fetch("logements-et-logements-sociaux-dans-les-departements.csv")
      .then(response => response.text())
      .then(csvString => {
        parseData(csvString, (parsedData) => {
          setData(parsedData);
          setFilteredData(parsedData); // Affiche toutes les données par défaut
        });
      });
  }, []);

  const handleSearch = (searchYear: string, searchRegion: string) => {
    setSelectedYear(searchYear);
    const filtered = data.filter(item => {
      const yearMatch = searchYear ? item.annee_publication === searchYear : true;
      const regionMatch = searchRegion ? item.nom_region.toLowerCase().includes(searchRegion.toLowerCase()) : true;
      return yearMatch && regionMatch;
    });
    setFilteredData(filtered);
  };

  const renderBarChart = (dataKey: string, fill: string, name: string) => (
    <BarChart
      width={600}
      height={300}
      data={filteredData}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="nom_region" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey={dataKey} name={name} fill={fill} />
    </BarChart>
  );

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <SearchForm onSearch={handleSearch} />
      <div className="flex flex-wrap justify-around items-center w-full">
        {renderBarChart("nombre_d_habitants", "#8884d8", "Nombre d'habitants")}
        {renderBarChart("taux_de_chomage_au_t4_en", "#82ca9d", "Taux de chômage")}
        {renderBarChart("construction", "#ffc658", "Nombre de constructions")}
      </div>
    </div>
  );
};

export default Dashboard;
