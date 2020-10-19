import React, { useEffect, useState } from 'react';
import { Button, Col, DatePicker, Input, Row, Table } from 'antd';
import 'antd/dist/antd.css';
import Modal from 'antd/lib/modal/Modal';

const Home = ()=>{

    const [modal, setModal] = useState(false);
    const [modalLoad, setModalLoad] = useState(false);
    const [name, setName] = useState(false);
    const [bulto, setBulto] = useState(false);
    const [reserva, setReserva] = useState(false);
    const [error, setError] = useState(false);
    const [pasajeros, setPasajeros] = useState(false);
    const [bultos, setBultos] = useState(false);
    const [bultosXPax, setBultoXPax] = useState(false);
    const [paxName, setPaxName] = useState(false);
    const [paxBultos, setPaxBultos] = useState(false);
    const [paxBultosModal, setPaxBultosModal] = useState(false);
    const [all, setAll] = useState(false);

    useEffect(()=>{
        if(!all)fetchAll()
    },[])

    const fetchAll = async ()=>{
        let allData = await fetch(`http://localhost:4000/api/passengers/all`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                        }
                })
            let response = await allData.json()
            response.map(res=>{
                res.articulos = res.articulos.length
            })
            setAll(response)
    }

    const columns = [
        {
            title: 'Pax ID',
            dataIndex: 'id',
            key: 'id',
          },
          {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'id',
          },
          {
            title: 'Nº Vuelo',
            dataIndex: 'reserva',
            key: 'id',
          },
          {
            title: 'Bultos',
            dataIndex: 'articulos',
            key: 'id',
          },
    ]

    const getPaxs =async()=>{
        setBultos(false)
        const data = await fetch(`http://localhost:4000/api/passengers/`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
                    }
            })
        const response = await data.json()
        setPasajeros(response)
    }

    const getBultos =async()=>{
        setPasajeros(false)
        const data = await fetch(`http://localhost:4000/api/packages/`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
                    }
            })
        const response = await data.json()
        setBultos(response)
        setBultoXPax(response)
    }
   
    const handleOk = () => {
        (async () => {
            const check = await fetch(`http://localhost:4000/api/passengers/${name}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                        }
                })
            const existe = await check.json()
            if(existe.length){
                setError("Ya existe un pax con ese nombre")
            }else{
                const rawResponse = await fetch('http://localhost:4000/api/passengers', {
                    method: 'POST',
                    body: JSON.stringify({name: name, reserva: reserva}),
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                            }
                    })
                const content = await rawResponse.json();
                setModal(false)
                setModalLoad(true)
                fetchAll()
            }
            })();    
      };

    const handleOkLoad = () => {
        (async () => {
            const check = await fetch(`http://localhost:4000/api/packages/${name}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                        }
                })
            const existe = await check.json()
            if(existe.length > 2){
                setError("La cantidad de bultos llego al límite")
            }else{
                const rawResponse = await fetch('http://localhost:4000/api/packages', {
                    method: 'POST',
                    body: JSON.stringify({bulto: bulto, pasajeroId: existe[0].id,
                        //  reserva: reserva
                        }),
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                            }
                    })
                const content = await rawResponse.json();
                setModal(false)
                setModalLoad(true)
                fetchAll()
            }
        })();    
    };  
    
    const handleCancel = () => {
        setModal(false)
    };
    const handleCancelLoad = () => {
        setModalLoad(false)
    };  

    const getPaxBultos = async () => {
        let get = await fetch(`http://localhost:4000/api/packages/${paxName}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
                    }
            })
        let response = await get.json()
        if(!response.length){
            setError("No existe ningun usuario con ese nombre")
        }else{
            if(response[1].length){
                setError("")
                setPaxBultos(response[1])
            }else{
                setError("El pasajero no tiene ningun bulto ingresado!")
            }
        }
    }

    const deleteItem = async (id)=>{
        let del = await fetch(`http://localhost:4000/api/packages/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
                    }
            })
            let response = await del.json()
            let newBultos = []
            bultos.map(bulto=>{
                if(bulto.id !== id)newBultos.push(bulto)
            })
            setBultos(newBultos)
            fetchAll()
    }

    const deleteItemDos = async (id)=>{
        let del = await fetch(`http://localhost:4000/api/packages/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
                    }
            })
            let response = await del.json()
            let newBultos = []
            paxBultos.map(bulto=>{
                if(bulto.id !== id)newBultos.push(bulto)
            })
            setPaxBultos(newBultos)
            fetchAll()
    }

    const deleteAll = async (arr)=>{
        let id = arr[0].pasajeroId
        let delAll = await fetch(`http://localhost:4000/api/packages/all/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
                    }
            })
            let response = await delAll.json()
            setPaxBultos(false)
            fetchAll()
    }



    return(  
        <div style={{margin:'100px'}}>
            <br/>
            <br/>
            <Button type='primary' size='large' onClick={()=>setModal(true)}>Agregar Pax o Bulto</Button>
            <Button style={{marginLeft: '100px'}} size='large' type='primary' onClick={()=>setPaxBultosModal(true)}>Retirar bultos</Button>
            {all ? (
                <Table dataSource={all} columns={columns} />
                // null
            ):null}
            {modal ? (
                 <Modal
                 title="Title"
                 visible={true}
                 onOk={handleOk}
                 onCancel={handleCancel}
                 >
                 <p>Nombre</p><input type="text" onChange={e=>setName(e.target.value)}></input>
                 <p>Nº de vuelo</p><input type="text" onChange={e=>setReserva(e.target.value)}></input>

                <p>{error}</p><Button onClick={()=>setModalLoad(true)}>Continuar</Button>
                 </Modal>
            ):(null)}
             {modalLoad ? (
                 <Modal
                 title="Agregar bulto"
                 visible={true}
                 onOk={handleOkLoad}
                 onCancel={handleCancelLoad}
                 >
                 <p>Bulto</p><input type="text" onChange={e=>setBulto(e.target.value)}></input>
                <p>{error}</p>
                 </Modal>
            ): null}
            <br/>
            <br/>
            <Button onClick={getPaxs}>Traer todos los pasajeros</Button>
            <Button onClick={getBultos}>Traer todos los bultos</Button>
            <br/>
            <br/>
            {pasajeros ? (
                pasajeros.map((pax)=>{
                return <div key={pax.id}>
                        <p>ID: {pax.id}</p>
                        <p>Nombre: {pax.name}</p>
                        <p>Nº de vuelo: {pax.reserva}</p>
                        <hr/>
                     </div>
                })
            ):null}
            {bultos ? (
                bultos.map((bul)=>{
                return <div key={bul.id}>
                        <span>ID Bulto:{bul.id}</span><Button style={{marginLeft: '10px'}} type='danger' size='small' onClick={()=>deleteItem(bul.id)}>Retirar</Button>
                        <p style={{marginTop:'10px'}}>Nombre: {bul.pasajero.name}</p>
                        <p>Bulto: {bul.bulto}</p>
                        <p>Nº de vuelo #{bul.pasajero.reserva}</p>
                        <hr/>
                     </div>
                })
            ):null}
            {paxBultosModal ? (
                <>
                <Modal
                title="Ingresar nombre del Pax"
                visible={true}
                onOk={getPaxBultos}
                // confirmLoading={confirmLoading}
                onCancel={()=>{setPaxBultosModal(false)}}
                >
                <p>Nombre:</p><input type="text" onChange={e=>setPaxName(e.target.value)}></input>
                <p>{error}</p>
                <br/>
                <br/>
                {paxBultos ? (
                    <div>
                        {paxBultos.length ? (<Button type='danger' onClick={()=>deleteAll(paxBultos)}>Retirar todo</Button>):null}
                        {paxBultos.map(bulto=>{
                        return <div>
                                    <p>ID Bulto:{bulto.id}</p>
                                    <p>{bulto.bulto}</p>
                                    <br/>
                                    <Button onClick={()=>deleteItemDos(bulto.id)}>Retirar</Button>
                                </div>
                    })}
                    </div>
                    
                 ): null}
                </Modal>
               
                </>
            ): null}
        </div>
    )
}

export default Home;