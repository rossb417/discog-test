import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.scss";
import ReactDOM from "react-dom";

import React, { useState, useEffect } from "react";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Dropdown } from "primereact/dropdown";
import { DiscogService } from "./discog.service";

const discogService = new DiscogService();

const DataViewDiscog = () => {
  const [products, setProducts] = useState(null);
  const [layout, setLayout] = useState("grid");
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState(null);
  const sortOptions = [
    { label: "Year - Newest", value: "!year" },
    { label: "Year - Oldest", value: "year" }
  ];

  useEffect(() => {
    discogService.getProducts().then((data) => setProducts(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSortChange = (event) => {
    const value = event.value;

    if (value.indexOf("!") === 0) {
      setSortOrder(-1);
      setSortField(value.substring(1, value.length));
      setSortKey(value);
    } else {
      setSortOrder(1);
      setSortField(value);
      setSortKey(value);
    }
  };

  const renderListItem = (data) => {
    return (
      <div className="p-col-12">
        <div className="discog-list-item">
          <img
            src={`${data.thumb}`}
            onError={(e) =>
              (e.target.src = `https://www.discogs.com/release/${data.id}`)
            }
            alt={data.name}
          />
          <div className="discog-list-detail">
            <div className="discog-name">
              <a href={`https://www.discogs.com/release/${data.id}`}>
                {data.artist}
              </a>
            </div>
            <div className="discog-title">{data.title}</div>
            <small className="small">{data.catno}</small>
          </div>
          <div className="discog-list-action">
            <span className="discog-year">{data.year}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderGridItem = (data) => {
    return (
      <div className="p-col-12 p-lg-3 p-md-4 p-sm-6">
        <div className="discog-grid-item card">
          <div className="discog-grid-item-top">
            <img
              src={`${data.thumb}`}
              onError={(e) =>
                (e.target.src =
                  "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
              }
              alt={data.name}
            />
          </div>
          <div className="discog-grid-item-content">
            <div className="discog-title">{data.title}</div>
            <div className="discog-name">
              <a href={`https://www.discogs.com/release/${data.id}`}>
                {data.artist}
              </a>
            </div>
          </div>

          <div className="discog-grid-item-bottom p-grid p-mt-2">
            <div className="p-col-8">
              <span className="discog-cat">{data.catno}</span>
            </div>
            <div className="p-col p-text-right">
              <span className="discog-year">{data.year}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const itemTemplate = (product, layout) => {
    if (!product) {
      return;
    }

    if (layout === "list") return renderListItem(product);
    else if (layout === "grid") return renderGridItem(product);
  };

  const renderHeader = () => {
    return (
      <div className="p-grid p-ai-center">
        <div className="p-col-6" style={{ textAlign: "left" }}>
          <Dropdown
            options={sortOptions}
            value={sortKey}
            optionLabel="label"
            placeholder="Sort By Year"
            onChange={onSortChange}
          />
        </div>
        <div className="p-col-3" style={{ textAlign: "center" }}>
          <h3 className="p-m-0">Ross B Discog Demo</h3>
        </div>
        <div className="p-col-3" style={{ textAlign: "right" }}>
          <DataViewLayoutOptions
            layout={layout}
            onChange={(e) => setLayout(e.value)}
          />
        </div>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div className="discog-view">
      <div className="card">
        <DataView
          value={products}
          layout={layout}
          header={header}
          itemTemplate={itemTemplate}
          paginator
          rows={20}
          sortOrder={sortOrder}
          sortField={sortField}
        />
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<DataViewDiscog />, rootElement);
