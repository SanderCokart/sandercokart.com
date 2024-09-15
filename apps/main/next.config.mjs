import withMdx from '@next/mdx'

const withMDX = withMdx()

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

};

const finalConfig = withMDX(nextConfig)

export default finalConfig