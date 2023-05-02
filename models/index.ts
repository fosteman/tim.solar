export interface Heartrate {
    bpm: number
    source: 'awake' | 'sleep'
    timestamp: string
}
