import React from "react";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [html, setHtml] = useState("");

  useEffect(() => {
    const getEvent = async () => {
      try {
        const fetchEventInfo = await fetch(
          "http://obscure-river-76343.herokuapp.com/order/success"
        );
        const jsonData = await fetchEventInfo.text();
        setHtml(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
    getEvent();
  });

  return <div>{html}</div>;
}
