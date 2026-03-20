import { useState } from "react"
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
                    blocks: [
                        {
                            type: "text",
                            text: lesson.content || "",
                        },
                    ],
                },
            ]

    return (
        <Box>
            {sections.map((sec, idx) => {
                const key = `${idx}-${sec.heading}`
                const isOpen = expanded.has(key)

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
                            {(sec.blocks || []).map((block, i) => {
                                if (block.type === "text") {
                                    return (
                                        <Paragraph key={i}>
                                            {block.text}
                                        </Paragraph>
                                    )
                                }

                                if (block.type === "image") {
                                    return (
                                        <Box
                                            key={i}
                                            component="img"
                                            src={block.imgUrl}
                                            alt={block.imgAlt || sec.heading || lesson.title}
                                            sx={{
                                                width: "100%",
                                                maxWidth: 720,
                                                mt: 2,
                                                mb: 2,
                                                display: "block",
                                                objectFit: "cover",
                                                borderRadius: "12px",
                                            }}
                                        />
                                    )
                                }

                                return null
                            })}
                        </AccordionDetails>
                    </StyledAccordion>
                )
            })}
        </Box>
    )
}