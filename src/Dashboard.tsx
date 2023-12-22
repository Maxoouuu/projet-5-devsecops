// Dashboard.tsx
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { parseData } from "./dataUtils";
import { DataItem } from "./types";
import SearchForm from "./SearchForm";

// Define the accumulator structure for the regions
interface RegionAccumulator {
  [region: string]: {
    nombre_d_habitants: number;
    taux_de_chomage_au_t4_en: number;
    construction: number;
    count: number;
  };
}

// Define the structure of the data we want to display in the charts
interface AggregatedRegionData {
  nom_region: string;
  nombre_d_habitants: number;
  taux_de_chomage_au_t4_en: number;
  construction: number;
}

// Aggregate data by region
const aggregateDataByRegion = (data: DataItem[]): AggregatedRegionData[] => {
    const groupedData = data.reduce((acc: RegionAccumulator, item: DataItem) => {
      const region = item.nom_region || "Unknown"; // Fallback for undefined region names
      if (!acc[region]) {
        acc[region] = {
          nombre_d_habitants: 0,
          taux_de_chomage_au_t4_en: 0,
          construction: 0,
          count: 0,
        };
      }
  
      acc[region].nombre_d_habitants += item.nombre_d_habitants || 0;
      acc[region].taux_de_chomage_au_t4_en += item.taux_de_chomage_au_t4_en || 0; // Corrected line
      acc[region].construction += item.construction || 0;
      acc[region].count += 1;
  
      return acc;
    }, {});

  return Object.keys(groupedData).map(region => {
    const regionData = groupedData[region];
    return {
      nom_region: region,
      nombre_d_habitants: regionData.nombre_d_habitants,
      taux_de_chomage_au_t4_en: regionData.taux_de_chomage_au_t4_en / regionData.count,
      construction: regionData.construction,
    };
  });
};

const Dashboard = () => {
  const [data, setData] = useState<AggregatedRegionData[]>([]);
  const [filteredData, setFilteredData] = useState<AggregatedRegionData[]>([]);

  useEffect(() => {
    fetch("logements-et-logements-sociaux-dans-les-departements.csv")
      .then(response => response.text())
      .then(csvString => {
        parseData(csvString, parsedData => {
          console.log("Parsed Data:", parsedData); // Debug parsed data
          const aggregatedData = aggregateDataByRegion(parsedData);
          console.log("Aggregated Data:", aggregatedData); // Debug aggregated data
          setData(aggregatedData);
          setFilteredData(aggregatedData);
        });
      });
  }, []);

  const handleSearch = (searchRegion: string) => {
    const filtered = data.filter(item =>
      item.nom_region?.toLowerCase().includes(searchRegion.toLowerCase())
    );
    console.log("Filtered Data:", filtered); // Debug filtered data
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
    <div>
      <SearchForm onSearch={handleSearch} />
      {renderBarChart("nombre_d_habitants", "#8884d8", "Nombre d'habitants")}
      {renderBarChart("taux_de_chomage_au_t4_en", "#82ca9d", "Taux de chômage")}
      {renderBarChart("construction", "#ffc658", "Nombre de constructions")}
    </div>
  );
};

export default Dashboard;
