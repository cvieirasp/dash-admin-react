import React from 'react';
import Chart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import StatusCard from '../components/status-card/StatusCard';
import Table from '../components/table/Table';
import Badge from '../components/badge/Badge';
import statusCards from '../assets/JsonData/status-card-data.json';

const charOptions = {
  series: [{
    name: 'Clientes Online',
    data: [40, 70, 20, 90, 36, 80, 30, 91, 60]
  }, {
    name: 'Clientes da Loja',
    data: [40, 30, 70, 80, 40, 16, 40, 20, 51]
  }],
  options: {
    color: ['#6ab04c', '#2980b9'],
    chart: {
      background: 'transparent'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set']
    },
    legend: {
      position: 'top'
    },
    grid: {
      show: false
    }
  }
}

const topCustomers = {
  head: [
      'usuário',
      'pedidos totais',
      'gastos totais'
  ],
  body: [
      {
          "username": "john doe",
          "order": "490",
          "price": "R$15,870"
      },
      {
          "username": "frank iva",
          "order": "250",
          "price": "R$12,251"
      },
      {
          "username": "anthony baker",
          "order": "120",
          "price": "R$10,840"
      },
      {
          "username": "frank iva",
          "order": "110",
          "price": "R$9,251"
      },
      {
          "username": "anthony baker",
          "order": "80",
          "price": "R$8,840"
      }
  ]
}

const renderCustomerHead = (item, index) => (
  <th key={index}>{item}</th>
)

const renderCustomerBody = (item, index) => (
  <tr key={index}>
      <td>{item.username}</td>
      <td>{item.order}</td>
      <td>{item.price}</td>
  </tr>
)

const latestOrders = {
  head: [
      "id",
      "usuário",
      "preço total",
      "data",
      "status"
  ],
  body: [
      {
          id: "#OD1711",
          user: "john doe",
          date: "17 Jun 2021",
          price: "R$900",
          status: "envio"
      },
      {
          id: "#OD1712",
          user: "frank iva",
          date: "1 Jun 2021",
          price: "R$400",
          status: "pago"
      },
      {
          id: "#OD1713",
          user: "anthony baker",
          date: "27 Jun 2021",
          price: "R$200",
          status: "pendente"
      },
      {
          id: "#OD1712",
          user: "frank iva",
          date: "1 Jun 2021",
          price: "R$400",
          status: "pago"
      },
      {
          id: "#OD1713",
          user: "anthony baker",
          date: "27 Jun 2021",
          price: "R$200",
          status: "reembolso"
      }
  ]
}

const orderStatus = {
  "envio": "primary",
  "pendente": "warning",
  "pago": "success",
  "reembolso": "danger"
}

const renderOrderHead = (item, index) => (
  <th key={index}>{item}</th>
)

const renderOrderBody = (item, index) => (
  <tr key={index}>
      <td>{item.id}</td>
      <td>{item.user}</td>
      <td>{item.price}</td>
      <td>{item.date}</td>
      <td>
          <Badge type={orderStatus[item.status]} content={item.status}/>
      </td>
  </tr>
)

const Dashboard = () => {
  const themeReducer = useSelector(state => state.ThemeReducer.mode);

  return (
    <div>
      <h2 className="page-header">Dashboard</h2>
      <div className="row">
        <div className="col-6">
          <div className="row">
            {
              statusCards.map((item, index) => (
                <div className="col-6" key={index}>
                  <StatusCard 
                    icon={item.icon}
                    count={item.count}
                    title={item.title}
                  />
                </div>
              ))
            }
          </div>
        </div>
        <div className="col-6">
          <div className="card full-height">
            <Chart 
              options={themeReducer === 'theme-mode-dark' ? {
                ...charOptions.options,
                theme: { mode: 'dark' }
              } : {
                ...charOptions.options,
                theme: { mode: 'light' }
              }}
              series={charOptions.series}
              type='line'
              height='100%'
            />
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card__header">
              <h3>Top Clientes</h3>
            </div>
            <div className="card__body">
              <Table
                headData={topCustomers.head}
                bodyData={topCustomers.body}
                renderHead={(item, index) => renderCustomerHead(item, index)}
                renderBody={(item, index) => renderCustomerBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to='/'>Ver todos</Link>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="card">
            <div className="card__header">
              <h3>Últimos Pedidos</h3>
            </div>
            <div className="card__body">
              <Table
                headData={latestOrders.head}
                bodyData={latestOrders.body}
                renderHead={(item, index) => renderOrderHead(item, index)}
                renderBody={(item, index) => renderOrderBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to='/'>Ver todos</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
