export default interface IForm {
    address: string[];
    name: string;
    duration: number;
    preset: number | null;    
    type: string;
    chains: string[];
    groupAssetsUnder: number;
    isGroupAssetsUnder: boolean;
    ignoreNFTs: boolean;
    showNFTCollections: boolean;
    isSnapshot: boolean;
  }