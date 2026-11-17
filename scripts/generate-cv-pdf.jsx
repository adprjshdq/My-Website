import { statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { Document, Link, Page, StyleSheet, Text, View, renderToFile } from '@react-pdf/renderer';
import { cv } from '../src/data/cv.js';

const OUT = fileURLToPath(new URL('../public/cv/Adipraja-Shidqi-CV.pdf', import.meta.url));

// Font standar PDF (Helvetica) memakai encoding lama, jadi karakter tipografis
// seperti "–" atau "·" bisa rusak saat teks disalin/dibaca ATS. PDF memakai
// padanan ASCII; halaman /cv/ tetap memakai karakter aslinya.
const clean = (text) => text.replace(/[\u2013\u2014]/g, '-').replace(/\u00b7/g, '/');

const C = {
    ink: '#171717',
    body: '#3a3a37',
    muted: '#787872',
    lime: '#bef264',
    rule: '#cfcdc5',
};

const s = StyleSheet.create({
    page: {
        backgroundColor: '#ffffff',
        paddingTop: 38,
        paddingHorizontal: 40,
        paddingBottom: 54,
        fontFamily: 'Helvetica',
        fontSize: 9.4,
        color: C.body,
    },

    kickerRow: { flexDirection: 'row', justifyContent: 'space-between' },
    kicker: {
        fontSize: 6.6,
        color: C.muted,
        textTransform: 'uppercase',
    },
    name: {
        marginTop: 9,
        fontSize: 24,
        fontFamily: 'Helvetica-Bold',
        color: C.ink,
        letterSpacing: -0.3,
        textTransform: 'uppercase',
    },
    roleRow: { flexDirection: 'row', marginTop: 5 },
    role: {
        backgroundColor: C.lime,
        color: C.ink,
        fontFamily: 'Helvetica-Bold',
        fontSize: 7.6,
        paddingHorizontal: 4,
        paddingVertical: 2,
        textTransform: 'uppercase',
    },
    metaRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
    meta: { fontSize: 7.2, color: C.muted, marginRight: 9 },
    link: { fontSize: 7.2, color: C.muted, textDecoration: 'underline', marginRight: 9 },
    headerRule: { marginTop: 9, borderBottomWidth: 1.4, borderBottomColor: C.ink },

    columns: { flexDirection: 'row', marginTop: 15 },
    colLeft: { width: '61%', paddingRight: 20 },
    colRight: { flexGrow: 1 },

    section: { marginBottom: 13 },
    sectionTitle: {
        fontSize: 6.6,
        color: C.muted,
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    paragraph: { fontSize: 9.2, lineHeight: 1.5, color: C.body },

    item: { marginBottom: 8 },
    itemTitle: { fontSize: 10.2, fontFamily: 'Helvetica-Bold', color: C.ink, lineHeight: 1.25 },
    itemMeta: {
        marginTop: 1.5,
        fontSize: 6.4,
        letterSpacing: 0.4,
        color: C.muted,
        textTransform: 'uppercase',
    },
    itemBody: { marginTop: 2, fontSize: 8.8, lineHeight: 1.5, color: C.body },

    period: { fontSize: 6.4, color: C.muted, textTransform: 'uppercase' },
    degree: { fontSize: 9.6, fontFamily: 'Helvetica-Bold', color: C.ink, lineHeight: 1.25 },
    school: { fontSize: 8.4, color: C.body },

    skillGroup: { marginBottom: 6 },
    skillLabel: { fontSize: 6.4, color: C.muted, textTransform: 'uppercase' },
    skillText: { fontSize: 8.4, lineHeight: 1.4, color: C.body },

    footer: {
        position: 'absolute',
        left: 40,
        right: 40,
        bottom: 26,
        paddingTop: 6,
        borderTopWidth: 0.8,
        borderTopColor: C.rule,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerText: { fontSize: 6.2, color: C.muted, textTransform: 'uppercase' },
});

function Section({ title, children }) {
    return (
        <View style={s.section}>
            <Text style={s.sectionTitle}>// {title}</Text>
            {children}
        </View>
    );
}

function CvDocument() {
    return (
        <Document
            title={`CV - ${cv.name}`}
            author={cv.name}
            subject="Curriculum Vitae"
            creator="adiprajashdq.vercel.app"
            language="id"
        >
            <Page size="A4" style={s.page} wrap>
                <View style={s.kickerRow}>
                    <Text style={s.kicker}>// Curriculum Vitae</Text>
                    <Text style={s.kicker}>Diperbarui {clean(cv.updated)}</Text>
                </View>

                <Text style={s.name}>{cv.name}</Text>

                <View style={s.roleRow}>
                    <Text style={s.role}>{cv.role}</Text>
                </View>

                <View style={s.metaRow}>
                    <Text style={s.meta}>{cv.location}</Text>
                    <Link src={`mailto:${cv.email}`} style={s.link}>
                        {cv.email}
                    </Link>
                </View>

                <View style={s.metaRow}>
                    {cv.links.map((link) => (
                        <Link key={link.href} src={link.href} style={s.link}>
                            {link.label}
                        </Link>
                    ))}
                </View>

                <View style={s.headerRule} />

                <View style={s.columns}>
                    <View style={s.colLeft}>
                        <Section title="Profil">
                            <Text style={s.paragraph}>{cv.profile}</Text>
                        </Section>

                        <Section title="Proyek Pilihan">
                            {cv.projects.map((project) => (
                                <View key={project.title} style={s.item} wrap={false}>
                                    <Text style={s.itemTitle}>{project.title}</Text>
                                    <Text style={s.itemMeta}>{project.tech.join(' / ')}</Text>
                                    <Text style={s.itemBody}>{project.description}</Text>
                                </View>
                            ))}
                        </Section>
                    </View>

                    <View style={s.colRight}>
                        <Section title="Pendidikan">
                            {cv.education.map((item) => (
                                <View key={item.degree} style={s.item} wrap={false}>
                                    <Text style={s.period}>{clean(item.period)}</Text>
                                    <Text style={s.degree}>{item.degree}</Text>
                                    <Text style={s.school}>{item.school}</Text>
                                </View>
                            ))}
                        </Section>

                        {cv.organizations.length > 0 && (
                            <Section title="Organisasi">
                                {cv.organizations.map((item) => (
                                    <View key={`${item.period}-${item.role}`} style={s.item} wrap={false}>
                                        <Text style={s.period}>{clean(item.period)}</Text>
                                        <Text style={s.degree}>{item.role}</Text>
                                        <Text style={s.school}>{item.place}</Text>
                                    </View>
                                ))}
                            </Section>
                        )}

                        {cv.certifications.length > 0 && (
                            <Section title="Sertifikasi">
                                {cv.certifications.map((item) => (
                                    <View key={item.name} style={s.item} wrap={false}>
                                        <Text style={s.period}>{item.year}</Text>
                                        <Text style={s.degree}>{item.name}</Text>
                                        <Text style={s.school}>{item.issuer}</Text>
                                    </View>
                                ))}
                            </Section>
                        )}

                        <Section title="Keahlian">
                            {cv.skills.map((group) => (
                                <View key={group.label} style={s.skillGroup} wrap={false}>
                                    <Text style={s.skillLabel}>{group.label}</Text>
                                    <Text style={s.skillText}>{group.items.join(' / ')}</Text>
                                </View>
                            ))}
                        </Section>

                        <Section title="Kontak">
                            <Text style={s.skillText}>{cv.email}</Text>
                            <Text style={s.skillText}>{cv.location}</Text>
                        </Section>
                    </View>
                </View>

                <View style={s.footer} fixed>
                    <Text style={s.footerText}>Portofolio: adiprajashdq.vercel.app</Text>
                    <Text style={s.footerText}>{cv.name}</Text>
                </View>
            </Page>
        </Document>
    );
}

try {
    await renderToFile(<CvDocument />, OUT);
    const { size } = statSync(OUT);
    console.log(`CV PDF dibuat: ${OUT} (${(size / 1024).toFixed(1)} KB)`);
} catch (error) {
    console.error('Gagal membuat CV PDF:', error);
    process.exitCode = 1;
}
