// dataUtils.ts
import Papa from "papaparse";
import { DataItem } from './types';

const mapCsvRowToDataItem = (row: any): DataItem => {
  return {
    annee_publication: row.annee_publication,
    code_departement: row.code_departement,
    nom_departement: row.nom_departement,
    code_region: row.code_region,
    nom_region: row.nom_region,
    nombre_d_habitants: parseInt(row.nombre_d_habitants, 10),
    densite_de_population_au_km2: parseInt(row.densite_de_population_au_km2, 10),
    variation_de_la_population_sur_10_ans_en: parseFloat(row.variation_de_la_population_sur_10_ans_en),
    dont_contribution_du_solde_naturel_en: parseFloat(row.dont_contribution_du_solde_naturel_en),
    dont_contribution_du_solde_migratoire_en: parseFloat(row.dont_contribution_du_solde_migratoire_en),
    population_de_moins_de_20_ans: parseInt(row.population_de_moins_de_20_ans, 10),
    population_de_60_ans_et_plus: parseInt(row.population_de_60_ans_et_plus, 10),
    taux_de_chomage_au_t4_en: parseFloat(row.taux_de_chomage_au_t4_en),
    taux_de_pauvrete_en: parseFloat(row.taux_de_pauvrete_en),
    nombre_de_logements: parseInt(row.nombre_de_logements, 10),
    nombre_de_residences_principales: parseInt(row.nombre_de_residences_principales, 10),
    taux_de_logements_sociaux_en: parseFloat(row.taux_de_logements_sociaux_en),
    taux_de_logements_vacants_en: parseFloat(row.taux_de_logements_vacants_en),
    taux_de_logements_individuels_en: parseFloat(row.taux_de_logements_individuels_en),
    moyenne_annuelle_de_la_construction_neuve_sur_10_ans: parseInt(row.moyenne_annuelle_de_la_construction_neuve_sur_10_ans, 10),
    construction: parseInt(row.construction, 10),
    parc_social_nombre_de_logements: parseInt(row.parc_social_nombre_de_logements, 10),
    parc_social_logements_mis_en_location: parseInt(row.parc_social_logements_mis_en_location, 10),
    parc_social_logements_demolis: parseInt(row.parc_social_logements_demolis, 10),
    parc_social_ventes_a_des_personnes_physiques: parseInt(row.parc_social_ventes_a_des_personnes_physiques, 10),
    parc_social_taux_de_logements_vacants_en: parseFloat(row.parc_social_taux_de_logements_vacants_en),
    parc_social_taux_de_logements_individuels_en: parseFloat(row.parc_social_taux_de_logements_individuels_en),
    parc_social_loyer_moyen_en_eur_m2_mois: parseFloat(row.parc_social_loyer_moyen_en_eur_m2_mois),
    parc_social_age_moyen_du_parc_en_annees: parseInt(row.parc_social_age_moyen_du_parc_en_annees, 10),
    parc_social_taux_de_logements_energivores_e_f_g_en: parseFloat(row.parc_social_taux_de_logements_energivores_e_f_g_en),
  };
};

export const parseData = (csvString: string, callback: (data: DataItem[]) => void) => {
    Papa.parse(csvString, {
      header: true,
      delimiter: ";",
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (result) => {
        console.log("Parsed Data:", result.data); // Log the parsed data
        const parsedData = result.data.map(mapCsvRowToDataItem);
        callback(parsedData);
      },
      error: (error: Error) => {
        console.error("Error parsing CSV:", error);
      }
    });
  };