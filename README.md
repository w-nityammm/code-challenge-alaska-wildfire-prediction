# **Code Challenge**  

This repository demonstrates my experience in **remote sensing and geospatial analytics**—as showcased in my research paper **"Predictive Modeling of Indian Agricultural Farms using Remote Sensing and Geospatial Analytics."**  

Here, I use **Google Earth Engine (GEE)** to process **multi-band satellite imagery**, compute **NDVI composites**, and perform a **basic land use classification** over an agricultural region (*using Karnal, Haryana as an example*). These techniques are directly applicable to challenges such as **wildfire risk prediction**, where identifying dry vegetation and different land cover types is crucial for fire risk assessment.  

---

## **Project Files & Description**  

#### **NDVI Analysis `ndvi_analysis.js`**  
Computes **Normalized Difference Vegetation Index (NDVI)** to analyze vegetation health using **Sentinel-2** satellite imagery. NDVI is a crucial metric for assessing the dryness of vegetation, which can indicate potential wildfire risks.  

---

#### **Land Cover Classification `landcover_classification.js`**  
Performs **land use classification** using a **Random Forest classifier** to differentiate between **agriculture, non-agriculture, and other land types**. This technique can help in mapping fire-prone areas by identifying regions with dry fuel sources.  

---

## **Usage**  

### **1: Use Provided Shareable Snapshots (auto-run disabled)**  
🔗 **[NDVI Analysis - GEE Script](https://code.earthengine.google.com/2868992c976aae4fb4f764b6258e2d8b?noload=true)**
🔗 **[Land Cover Classification - GEE Script](https://code.earthengine.google.com/e5d8d54067a3a6d6ce1dfd7b2b70b80c?noload=true)**  

Once opened, click **"Run"** to execute the script and view results.  

---

### **2: Paste Scripts Directly in GEE**  
If you want to **customize the region, change color schemes, or adjust parameters** you can directly paste these scripts into GEE and modify them as needed. 

1️. Go to **[Google Earth Engine Code Editor](https://code.earthengine.google.com/)**  
2️. Create a new script.  
3️. Copy and paste the contents of either `ndvi_analysis.js` or `landcover_classification.js`.  
4️. Modify the **region coordinates**, color palette, or time range as needed.  
5️. Click **"Run"** to visualize the results.  

---

## **Sample Visualizations**  

![Screenshot 2025-02-26 011330](https://github.com/user-attachments/assets/fd367a46-455e-44a7-be9e-aa7c2ce75b97)  
*NDVI Analysis Result*  

---  

![Screenshot 2025-02-26 011234](https://github.com/user-attachments/assets/73ae2706-6706-448f-93b7-9256cd3ed2c1)  
*Land Cover Classification Output*  

---


  

