export type Config = {
  jsonRPC: string
  systemContracts: Record<string, string>
  contracts: Record<string, string>
}

export const config: Config = {
  jsonRPC: 'https://api.koinos.io',
  systemContracts: {
    koin: '15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL',
    vhp: '18tWNU7E4yuQzz7hMVpceb9ixmaWLVyQsr',
    pob: '159myq5YUhhoVWu3wsHKHiJYKPKGUrGiyv',
    claim: '18zw3ZokdfHtudzaWAUnU4tUvKzKiJeN76',
    governance: '19qj51eTbSFJYU7ZagudkpxPgNSzPMfdPX',
    nameservice: '19WxDJ9Kcvx4VqQFkpwVmwVEy1hMuwXtQE',
    resources: '1HGN9h47CzoFwU2bQZwe6BYoX4TM6pXc4b'
  },
  contracts: {
    kap: '13tmzDmfqCsbYT26C4CmKxq86d33senqH3',
    nicknames:'1KD9Es7LBBjA1FY3ViCgQJ7e6WH1ipKbhz'
  }
}
