import React, { createContext, useState, useEffect } from "react";
import Axios from "../axios/axios.config.js"; 
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setItems } from "../redux/item.Slice.js";
import { toast } from "react-hot-toast";

export const StockContext = createContext();

function StockProvider({ children }) {
  const dispatch = useDispatch();

  // ------------------ States ------------------
  const [searchItem, setSearchItem] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [categories, setCategories] = useState([]);

  const [searchSale, setSearchSale] = useState("");
  const [upperDate, setUpperDate] = useState("");
  const [lowerDate, setLowerDate] = useState("");
  const [saleList, setSaleList] = useState([]);

  // ------------------ Fetch Sales ------------------
  const getSaleList = async () => {
    try {
      const paramsPayload = {
        search: searchSale,
        upperDate,
        lowerDate,
      };
      const res = await Axios.get("/api/sale/", { params: paramsPayload });

      if (res.data.success) {
        const filteredSales = res.data.sales.filter(
          (sale) => sale && sale._id
        );
        setSaleList(filteredSales);
      } else {
        console.warn("Failed to fetch sales:", res.data.message);
      }
    } catch (error) {
      console.error("Error fetching sales:", error.message);
    }
  };

  // Manual refetch for sales
  const refetchSaleList = async () => {
    await getSaleList();
  };

  // ------------------ Fetch Items ------------------
  const getItemsList = async () => {
    try {
      const paramsPayload = {
        categories: JSON.stringify(selectedCategories),
        search: searchItem,
      };
      const res = await Axios.get("/api/item/", { params: paramsPayload });
      if (!res.data.success) throw new Error("No items fetched");

      const filteredItems = res.data.items.filter(
        (item) => item && item._id
      );
      return filteredItems;
    } catch (error) {
      console.error("Failed to fetch items list:", error);
      throw error;
    }
  };

  // React Query for Items
  const {
    data: fetchedItemsList = [],
    error,
    isLoading,
    isError,
    refetch: refetchItemsList,
  } = useQuery({
    queryKey: ["items", selectedCategories, searchItem],
    queryFn: getItemsList,
    keepPreviousData: true,
    staleTime: 0,
  });

  // Sync Items to Redux Store
  useEffect(() => {
    if (fetchedItemsList.length > 0) {
      dispatch(setItems(fetchedItemsList));
    }
  }, [fetchedItemsList, dispatch]);

  // ------------------ Fetch Categories ------------------
  const fetchCategories = async () => {
    try {
      const res = await Axios.get("/api/category/categories");
      if (res?.data?.success) {
        setCategories(res.data.categories || []);
      } else {
        toast.error("Failed to fetch categories list.");
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Error fetching categories."
      );
    }
  };

  // ------------------ Auto-fetch sales when filters change ------------------
  useEffect(() => {
    getSaleList();
  }, [upperDate, lowerDate, searchSale]);

  // ---------------------------------------------------------
  // ⭐ NEW: FETCH ALL SALES, ITEMS, CATEGORIES ON APP MOUNT ⭐
  // ---------------------------------------------------------
  useEffect(() => {
    fetchCategories();     // Categories
    refetchItemsList();    // Items
    refetchSaleList();     // Sales
  }, []);
  // ---------------------------------------------------------

  // ------------------ Context values ------------------
  const values = {
    // Items filtering
    searchItem,
    setSearchItem,
    selectedCategories,
    setSelectedCategories,
    fetchedItemsList,
    isLoading,
    isError,
    error,
    refetchItemsList,

    // Sales filtering
    searchSale,
    setSearchSale,
    upperDate,
    setUpperDate,
    lowerDate,
    setLowerDate,
    saleList,
    refetchSaleList,

    // Categories
    categories,
    fetchCategories,
  };

  return (
    <StockContext.Provider value={values}>
      {children}
    </StockContext.Provider>
  );
}

export default StockProvider;
