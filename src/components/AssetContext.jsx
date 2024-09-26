import React, { createContext, useState } from "react";

export const AssetContext = createContext();

export const AssetProvider = ({ children }) => {
  const [assetCount, setAssetCount] = useState(0);

  return (
    <AssetContext.Provider value={{ assetCount, setAssetCount }}>
      {children}
    </AssetContext.Provider>
  );
};
