using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.May2020.Domain.Dtos
{
    public class ApplicantDto
    {
        public string Name { get; private set; }
        public string FamilyName { get; private set; }
        public string Address { get; private set; }
        public string CountryOfOrigin { get; private set; }
        public string EMailAdress { get; private set; }
        public int Age { get; private set; }
        public bool Hired { get; private set; }

    }
}
