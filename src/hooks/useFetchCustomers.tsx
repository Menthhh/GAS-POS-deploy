// http://localhost:3000/api/customer/get-customers
// {
// 	"status": 200,
// 	"result": [
// 		{
// 			"customer_id": "1",
// 			"customer_name": "John Doe",
// 			"customer_address": "123 Main St, City, Country",
// 			"contact": "john@example.com",
// 			"tel": "+1234567890",
// 			"dan_id": "ABC123",
// 			"date": "2024-05-13T17:00:00.000Z",
// 			"company_name": "XYZ Inc.",
// 			"company_address": "456 Elm St, City, Country",
// 			"PRODUCT_TYPE": "Product A",
// 			"tax_id": "DEF456"
// 		}
// 	]
// }

import { useEffect, useState } from "react";
import type { Customer } from "@/models/Customer.type";

const useFetchCustomers = ( refresh: boolean) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/get-customers", {
          next: { revalidate: 10 },
        });
        const { customers } = await res.json();
        setCustomers(customers);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [refresh]);

  return { customers, loading, error };
};

export default useFetchCustomers;
