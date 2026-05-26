import vehiclesData from "../data/vehicles.json";

export const vehicleBrands: string[] = vehiclesData.brands;

export function searchBrands(query: string): string[] {
  const q = query.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  return vehicleBrands.filter((b) =>
    b.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").includes(q)
  );
}
