import { AuthProvider } from "@/context/AuthContext";
import "../styles/hero-vars.css";
import Header from "@/components/header2/header";
import Footer from "@/components/footer/footer";
import styles from "../styles/Home.module.css";
import { MusicProvider } from "../context/MusicContext";
import WelcomeMusicPopup from "../click/WelcomeMusicPopup/WelcomeMusicPopup";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <MusicProvider>
        {/* Welcome Music Popup - Shows on first load */}
        <WelcomeMusicPopup />

        {/* Header needs to be INSIDE MusicProvider because it uses useMusic() */}
        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
          <div style={{maxWidth:'1408px', width:"100%"}}>
            <Header />

          <main className={styles.mainContent} style={{marginLeft:'1px'}}>
              <Component {...pageProps} />
            </main>
        <Footer />
          </div>
        </div>

      </MusicProvider>
    </AuthProvider>
  );
}
