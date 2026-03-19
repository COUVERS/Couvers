import { useState, Fragment } from "react"
import { styled } from "@mui/material/styles"
import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

const StyledAccordion = styled(Accordion)(() => ({
    backgroundColor: "transparent",
    boxShadow: "none",
    border: "none",
    marginTop: "24px",
    "&:before": {
        display: "none",
    },
}))

const StyledSummary = styled(AccordionSummary)(() => ({
    padding: 0,
    minHeight: "auto",
    "& .MuiAccordionSummary-content": {
        margin: 0,
    },
}))

const SectionHeading = styled(Typography)(() => ({
    fontSize: "var(--FontSize-Headings-h3)",
    fontWeight: 600,
    color: "var(--Color-Text-Primary)",
}))

const Paragraph = styled(Typography)(() => ({
    fontSize: "var(--FontSize-Body1)",
    lineHeight: "var(--LineHeight-Body1)",
    color: "var(--Color-Text-Primary)",
    marginTop: "10px",
    whiteSpace: "pre-line",
}))

export default function LectureContent({ lesson }) {
    const [expanded, setExpanded] = useState(() => new Set())

    if (!lesson) return null

    const toggle = (key) => {
        setExpanded((prev) => {
            const next = new Set(prev)
            if (next.has(key)) next.delete(key)
            else next.add(key)
            return next
        })
    }

    const sections =
        lesson.sections && lesson.sections.length > 0
            ? lesson.sections
            : [
                    {
                        heading: lesson.title || "Lesson Content",
                        content: lesson.content || "",
                    },
                ]

    return (
        <Box>
            {sections.map((sec, idx) => {
                const key = `${idx}-${sec.heading}`
                const isOpen = expanded.has(key)

                const lines = (Array.isArray(sec.content) ? sec.content.join("\n") : sec.content || "")
                    .split("\n")
                    .filter((line) => line.trim())

                return (
                    <StyledAccordion
                        key={key}
                        expanded={isOpen}
                        onChange={() => toggle(key)}
                    >
                        <StyledSummary expandIcon={<ExpandMoreIcon />}>
                            <SectionHeading>{sec.heading}</SectionHeading>
                        </StyledSummary>

                        <AccordionDetails>
                            {lines.map((line, i) => (
                                <Fragment key={i}>
                                    <Paragraph>{line}</Paragraph>

                                    {idx === 1 && i === 2 && lesson.imgUrl && (
                                        <Box
                                            component="img"
                                            src={lesson.imgUrl}
                                            alt={lesson.title}
                                            sx={{
                                                width: "100%",
                                                maxWidth: 720,
                                                mt: 2,
                                                mb: 2,
                                                display: "block",
                                                objectFit: "cover",
                                            }}
                                        />
                                    )}
                                </Fragment>
                            ))}
                        </AccordionDetails>
                    </StyledAccordion>
                )
            })}
        </Box>
    )
}