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

const HeaderCard = styled(Box)(() => ({
    backgroundColor: "var(--Color-Background-Paper)",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
    border: "1px solid var(--Color-Divider)",
}))

const Title = styled(Typography)(() => ({
    fontSize: "var(--FontSize-Display-Medium)",
    fontWeight: 600,
    letterSpacing: "var(--LetterSpace-DisplayMedium)",
    color: "var(--Color-Primary-Main)",
    marginBottom: "12px",
}))

const Desc = styled(Typography)(() => ({
    fontSize: "var(--FontSize-Body1)",
    lineHeight: "var(--LineHeight-Body1)",
    color: "var(--Color-Text-Secondary)",
}))

const StyledAccordion = styled(Accordion)(() => ({
    backgroundColor: "var(--Color-Background-Paper)",
    borderRadius: "16px",
    border: "1px solid var(--Color-Divider)",
    boxShadow: "none",
    marginTop: "16px",
    "&:before": { display: "none" },
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

    return (
    <>
        <HeaderCard>
        <Title>{lesson.title}</Title>
        <Desc>{lesson.lessonDescription}</Desc>
        </HeaderCard>

        {(lesson.sections || []).map((sec, idx) => {
        const key = `${idx}-${sec.heading}`
        const isOpen = expanded.has(key)

        return (
            <StyledAccordion key={key} expanded={isOpen} onChange={() => toggle(key)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <SectionHeading>{sec.heading}</SectionHeading>
            </AccordionSummary>
            <AccordionDetails>
                {(sec.content || []).map((line, i) => (
                <Paragraph key={i}>{line}</Paragraph>
                ))}
            </AccordionDetails>
            </StyledAccordion>
        )
        })}
    </>
    )
}