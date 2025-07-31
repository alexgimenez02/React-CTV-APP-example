export enum KeyNames {
    UP = 'ArrowUp',
    DOWN = 'ArrowDown',
    LEFT = 'ArrowLeft',
    RIGHT = 'ArrowRight',
    ENTER = 'Enter',
    BACK = 'Backspace'
}

export default class KeyConfig {
    static handleDown(interaction: () => void) {
        const handler = (event: KeyboardEvent) => {
            if(event.key === KeyNames.DOWN) {
                interaction()
            }
        }
        window.addEventListener('keydown', handler)

        return () => window.removeEventListener('keydown', handler)
    }

    static handleUp(interaction: () => void) {
        const handler = (event: KeyboardEvent) => {
            if(event.key === KeyNames.UP) {
                interaction()
            }
        }
        window.addEventListener('keydown', handler)

        return () => window.removeEventListener('keydown', handler)
    }

    static handleLeft(interaction: () => void) {
        const handler = (event: KeyboardEvent) => {
            if(event.key === KeyNames.LEFT) {
                interaction()
            }
        }
        window.addEventListener('keydown', handler)

        return () => window.removeEventListener('keydown', handler)
    }

    static handleRight(interaction: () => void){
        const handler = (event: KeyboardEvent) => {
            if(event.key === KeyNames.RIGHT) {
                interaction()
            }
        }
        window.addEventListener('keydown', handler)

        return () => window.removeEventListener('keydown', handler)
    }

    static handleBack(interaction: () => void) {
        const handler =  (event: KeyboardEvent) => {
            if(event.key === KeyNames.BACK) {
                interaction()
            }
        }
        window.addEventListener('keydown', handler)

        return () => window.removeEventListener('keydown', handler)
    }

    static handleEnter(interaction: () => void) {
        const handler = (event: KeyboardEvent) => {
            if(event.key === KeyNames.ENTER) {
                interaction()
            }
        }
        window.addEventListener('keydown', handler)

        return () => window.removeEventListener('keydown', handler)
    }

    static handleKey(keys: string[], interactions: (() => void)[] ) {
        const handler = (event: KeyboardEvent) => {
            if(keys.length !== interactions.length) {
                throw new Error('Keycodes and interactions should be the same length!')
            }
            keys.filter((key, idx) =>  {
                if(event.key === key) {
                    interactions[idx]()
                    return true
                }
                return false
            })
        }
        window.addEventListener('keydown', handler)

        return () => window.removeEventListener('keydown', handler)
    }
}