import * as React from "react";
import Head from 'next/head'
import Image from 'next/image'
import Portada from '../public/Portada.png'
import { recursiveCatalog } from '../lib/shopify'
import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels,
  ChartCategoryAxis,
  ChartCategoryAxisItem
} from "@progress/kendo-react-charts";
import { PDFExport, savePDF, PDFMargin } from "@progress/kendo-react-pdf";

function Home({products}) {
  const pdfExportComponent = React.useRef(null);

  const exportPDFWithMethod = () => {
    let element = document.querySelector(".pdf") || document.body;
    savePDF(element, {
      author: "Sublicenter",
      creator: "Rubén Ely Trujillo Pérez",
      paperSize: "Letter",
      fileName: "Sublicatalogo",
      repeatHeaders: true,
      margin: {left: "1.27cm", right: "1.27cm", top: "1cm", bottom: "1.27cm"},
      scale: 0.6,
      landscape: true
    });
  };

  console.log(products)
  return (
    <>
      <Head>
        <title>Catalogo de SUBLICENTER || sublicenter.mx</title>
      </Head>
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <div className="navbar-brand">
            <button className="k-button" onClick={exportPDFWithMethod}>
              Exportar PDF
            </button>
          </div>
        </div>
      </nav>

      <PDFExport ref={pdfExportComponent} paperSize="A4">
        <div className="pdf">
          <div className="container mx-auto d-block">
            <Image src="/portada-carta.jpg" class="img-fluid" alt="Catalogo de sublicenter" width={3300} height={2500} />
          </div>
          <div className="container table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Color</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.node.title}</td>
                    <td>{product.node.options[0].values[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </PDFExport>
    </>
  )
}

export async function getStaticProps(){
  const products = await recursiveCatalog()
  return{
    props: {
      products
    }
  }
}


export default Home