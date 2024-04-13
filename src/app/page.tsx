"use client"
import {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { increment, decrement, setInitialCount } from "@/redux/counterSlice";
import { useAddProductMutation, useDeleteProductMutation, useGetGoodsQuery } from "@/redux/goodApi";

export default function Home() {
  const [newProduct, setNewProduct] = useState('');
  const { data = [], isLoading } = useGetGoodsQuery();
  const [addProduct] = useAddProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const counter = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();


  useEffect(() => {
    if (!isLoading && data.length > 0) {
      dispatch(setInitialCount(data.length));
    }
  }, [data, isLoading, dispatch]);

  const handleAddProduct = async () => {
    if (newProduct) {
      await addProduct({ name: newProduct }).unwrap();
      setNewProduct('');
      dispatch(increment());
    }
  };

  const handleDeleteProduct = async (id: number) => {
    await deleteProduct(id.toString()).unwrap();
    dispatch(decrement());
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
      <div>
        <div className='bg-amber-950 h-20 w-1/4 pl-3'>
          <input
              type="text"
              value={newProduct}
              onChange={(e) => setNewProduct(e.target.value)}
              className='border-2 border-rose-500 rounded-lg p-1'
          />
          <button className='m-5 bg-amber-300 p-1 rounded-lg' onClick={handleAddProduct}>Add Product</button>
        </div>
        <div>
          <p>Product Count: {counter}</p>
        </div>
        <ul className='text-center'>
          {data.map(item => (
              <li key={item.id} onClick={() => handleDeleteProduct(item.id)}>
                {item.name}
              </li>
          ))}
        </ul>
      </div>
  );
}
