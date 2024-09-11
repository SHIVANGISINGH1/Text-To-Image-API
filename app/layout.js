import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "@mui/material";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Container>{children}</Container>
        <Footer />
      </body>
    </html>
  );
}
