
import Header from '../components/Header'
import FooterComp from '../components/Footer'

function Layout({children}) {
  return (
    <>
    <Header/>
    <main className='container mx-auto min-h-[60vh]'>{children}</main>
    <FooterComp/>
    </>
  )
}

export default Layout
