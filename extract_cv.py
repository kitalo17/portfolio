import zipfile
import xml.etree.ElementTree as ET

def extract_text_from_docx(docx_path, txt_path):
    # Namespaces
    ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    
    with zipfile.ZipFile(docx_path) as docx:
        xml_content = docx.read('word/document.xml')
        root = ET.fromstring(xml_content)
        
        paragraphs = []
        for p in root.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
            p_text = []
            for r in p.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}r'):
                for t in r.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t'):
                    p_text.append(t.text)
            paragraphs.append(''.join(p_text))
            
        with open(txt_path, 'w', encoding='utf-8') as f:
            for p in paragraphs:
                if p.strip():
                    f.write(p + '\n')

if __name__ == '__main__':
    extract_text_from_docx('20250424-CV of Watcharakon Noothong.docx', 'cv_text.txt')
    print("Done")
