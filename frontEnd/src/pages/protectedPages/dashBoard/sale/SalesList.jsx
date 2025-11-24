import React, { useEffect, useContext, useState } from "react";
import { StockContext } from "../../../../stockContext/StockContext.jsx";
import SaleRowCard from "../../../../components/cards/SaleRowCard.jsx";
import Loading from "../../../../components/Loading.jsx";

function SalesList() {
  const { saleList} = useContext(StockContext);
  const [sales, setSales] = useState([])
  useEffect(() => {
    setSales(saleList)
  },);

 
  return (
    <div className="p-4">
      {/* Scrollable list container with persistent vertical scrollbar */}
      <div className="overflow-y-scroll max-h-[80vh] flex flex-col gap-3 px-2 sm:px-4 py-2">
        {sales.map((sale) => (
          <SaleRowCard key={sale._id} sale={sale} />
        ))}
      </div>
    </div>
  );
}

export default SalesList;
