import { useEffect, useState } from "react"
import { ComponentType } from "react"

/**
 * @framerDisableUnlink
 */
export function withDynamicViewportHeight(Component): ComponentType {
    return (props) => {
        const [dvh, setDvh] = useState("100vh")

        useEffect(() => {
            const updateDvh = () => {
                const vh = window.innerHeight * 0.01
                document.documentElement.style.setProperty("--dvh", `${vh}px`)
                setDvh(`${window.innerHeight}px`)
            }

            updateDvh()
            window.addEventListener("resize", updateDvh)

            return () => window.removeEventListener("resize", updateDvh)
        }, [])

        return <Component {...props} style={{ ...props.style, height: dvh }} />
    }
}

export function withSmallViewportHeight(Component): ComponentType {
    return (props) => {
        const [svh, setSvh] = useState("100vh")

        useEffect(() => {
            const setInitialSvh = () => {
                const vh = window.innerHeight * 0.01
                document.documentElement.style.setProperty("--svh", `${vh}px`)
                setSvh(`${window.innerHeight}px`)
            }

            setInitialSvh()

            // We're not adding any resize listeners to keep it static
        }, [])

        return <Component {...props} style={{ ...props.style, height: svh }} />
    }
}