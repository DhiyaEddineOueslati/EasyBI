import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery, useGetProductsQuery } from "@/api/api";
import { Box, Typography, useTheme } from "@mui/material";
import React, { useMemo } from "react";
import {
  Tooltip,
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";

const pieData = [
  { name: "Groupe A", value: 600 },
  { name: "Groupe B", value: 400 },
];

const Row2 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[300]];
  const { data: operationalData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();

  const operationalExpenses = useMemo(() => {
    return (
        operationalData &&
        operationalData[0].monthlyData.map(
            ({ month, operationalExpenses, nonOperationalExpenses }) => {
              return {
                name: month.substring(0, 3),
                "Dépenses opérationnelles": operationalExpenses,
                "Dépenses non opérationnelles": nonOperationalExpenses,
              };
            }
        )
    );
  }, [operationalData]);

  const productExpenseData = useMemo(() => {
    return (
        productData &&
        productData.map(({ _id, price, expense }) => {
          return {
            id: _id,
            price: price,
            expense: expense,
          };
        })
    );
  }, [productData]);

  return (
      <>
        <DashboardBox gridArea="d">
          <BoxHeader
              title="Dépenses opérationnelles vs non opérationnelles"
              sideText="+4%"
          />
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={operationalExpenses}
                margin={{
                  top: 20,
                  right: 0,
                  left: -10,
                  bottom: 55,
                }}
            >
              <CartesianGrid vertical={false} stroke={palette.grey[800]} />
              <XAxis
                  dataKey="name"
                  tickLine={false}
                  style={{ fontSize: "10px" }}
              />
              <YAxis
                  yAxisId="left"
                  orientation="left"
                  tickLine={false}
                  axisLine={false}
                  style={{ fontSize: "10px" }}
              />
              <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  style={{ fontSize: "10px" }}
              />
              <Tooltip />
              <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="Dépenses non opérationnelles"
                  stroke={palette.tertiary[500]}
              />
              <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="Dépenses opérationnelles"
                  stroke={palette.primary.main}
              />
            </LineChart>
          </ResponsiveContainer>
        </DashboardBox>
        <DashboardBox gridArea="e">
          <BoxHeader title="Campagnes et Objectifs" sideText="+4%" />
          <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
            <PieChart
                width={110}
                height={100}
                margin={{
                  top: 0,
                  right: -10,
                  left: 10,
                  bottom: 0,
                }}
            >
              <Pie
                  stroke="none"
                  data={pieData}
                  innerRadius={18}
                  outerRadius={38}
                  paddingAngle={2}
                  dataKey="value"
              >
                {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                ))}
              </Pie>
            </PieChart>
            <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
              <Typography variant="h5">Ventes cibles</Typography>
              <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
                100
              </Typography>
              <Typography variant="h6">
                Objectifs financiers de la campagne souhaitée
              </Typography>
            </Box>
            <Box flexBasis="40%">
              <Typography variant="h5">Pertes de revenus</Typography>
              <Typography variant="h6">Les pertes ont diminué de 25%</Typography>
              <Typography mt="0.4rem" variant="h5">
                Marges bénéficiaires
              </Typography>
              <Typography variant="h6">
                Les marges ont augmenté de 30% par rapport au mois dernier.
              </Typography>
            </Box>
          </FlexBetween>
        </DashboardBox>
        <DashboardBox gridArea="f">
          <BoxHeader title="Prix des produits vs Dépenses" sideText="+4%" />
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
                margin={{
                  top: 20,
                  right: 25,
                  bottom: 40,
                  left: -10,
                }}
            >
              <CartesianGrid stroke={palette.grey[800]} />
              <XAxis
                  type="number"
                  dataKey="price"
                  name="price"
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "10px" }}
                  tickFormatter={(v) => `$${v}`}
              />
              <YAxis
                  type="number"
                  dataKey="expense"
                  name="expense"
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "10px" }}
                  tickFormatter={(v) => `$${v}`}
              />
              <ZAxis type="number" range={[20]} />
              <Tooltip formatter={(v) => `$${v}`} />
              <Scatter
                  name="Ratio des dépenses du produit"
                  data={productExpenseData}
                  fill={palette.tertiary[500]}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </DashboardBox>
      </>
  );
};

export default Row2;
