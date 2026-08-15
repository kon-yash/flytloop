import type { Metadata } from 'next'; import './globals.css';
export const metadata:Metadata={title:'FlytLoop — Customer Voice to Action',description:'AI-native customer-product feedback operating system'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
