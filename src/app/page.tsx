"use client"
import {useState} from "react";
import {useAddProductMutation, useDeleteProductMutation, useGetGoodsQuery} from "@/redux/goodApi";


export default function Home() {

  const [count, setCount] = useState('');
  const [newProduct, setNewProduct] = useState('');
  const {data = [], isLoading} = useGetGoodsQuery(count);
  const [addProduct] = useAddProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleAddProduct = async () => {
    if(newProduct) {
      await addProduct({name: newProduct}).unwrap();
      setNewProduct('');
    }
  }

  const handleDeleteProduct = async (id:number) => {
    await deleteProduct(id.toString()).unwrap();
  }

  if (isLoading) return <h1>Loading...</h1>

  return (
      <div>
        <div>
          <input
              type="text"
              value={newProduct}
              onChange={(e) => setNewProduct(e.target.value)}
          />
          <button onClick={handleAddProduct}>Add product</button>
        </div>
        <div>
          <select value={count} onChange={(e) => setCount(e.target.value)}>
            <option value="">all</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <ul>
          {data.map(item => (
              <li key={item.id} onClick={() => handleDeleteProduct(item.id)}>
                {item.name}
              </li>
          ))}
        </ul>
      </div>
  );
}
