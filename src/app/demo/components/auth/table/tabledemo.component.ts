import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { GroupsService } from 'src/app/demo/service/group.service';
import { UserService } from 'src/app/demo/service/auth.service';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Group, UserResponseDTO } from 'src/app/demo/api/groups';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './tabledemo.component.html',
    providers: [MessageService, ConfirmationService]
})
export class TableDemoComponent implements OnInit {

    customers1: Customer[] = [];

    customers2: Customer[] = [];

    customers3: Customer[] = [];

    selectedCustomers1: Customer[] = [];

    selectedCustomer: Customer = {};

    representatives: Representative[] = [];

    statuses: any[] = [];
    LoggedInUserRole!: string
    LoggedInUserId!: string
    products: Product[] = [];
    newGroup = {
        name: '',
        projectName: '',
        encadrant: {
          name: '',
          email: '',
          role : 'TEACHER'
        }
      };
    
      newMember = {
        id : '',
        name: '',
        email: '',
        role: '',
        phone: '',
        className: '',
        espritId: ''
      };
    groups : Group[] = [];
    groupId? : string;
    member? : UserResponseDTO;
    addMemberDialogVisible: boolean = false;
    addGroupDialogVisible: boolean = false;
    rowGroupMetadata: any;

    expandedRows: expandedRows = {};

    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading: boolean = true;
    generateGroupsDialogVisible: boolean = false;
    groupClass: string = '';
    feedbackDialogVisible: boolean = false;
    feedbackResults: { success: boolean; message: string }[] = [];
    @ViewChild('filter') filter!: ElementRef;

    constructor(private customerService: CustomerService, private productService: ProductService, private GroupsService :GroupsService, private UserService : UserService, private MessageService : MessageService) { }

    ngOnInit() {
        this.customerService.getCustomersLarge().then(customers => {
            this.customers1 = customers;
            this.loading = false;

            // @ts-ignore
            this.customers1.forEach(customer => customer.date = new Date(customer.date));
        });
        this.customerService.getCustomersMedium().then(customers => this.customers2 = customers);
        this.customerService.getCustomersLarge().then(customers => this.customers3 = customers);
        this.productService.getProductsWithOrdersSmall().then(data => this.products = data);
        const token = localStorage.getItem('token') ?? '';
        const userId = localStorage.getItem('id') ?? '';
        this.LoggedInUserId = userId;
        this.UserService.getUserRole(token).subscribe((response) => {
                this.LoggedInUserRole = response
                if(this.LoggedInUserRole =='STUDENT'){
                    console.log('getGroupsForGivenUser')
                    this.GroupsService.getGroupsForGivenUser(userId).then(data => {this.groups = data; console.log(this.groups); console.log(data)});
                }
                else{
                    console.log('getGroups')
                    this.GroupsService.getGroups().then(data => {this.groups = data; console.log(this.groups); console.log(data)});
                }
            },
            (error) => {
                console.error('Error getting role:', error);
            });
        
         
        this.representatives = [
            { name: 'Amy Elsner', image: 'amyelsner.png' },
            { name: 'Anna Fali', image: 'annafali.png' },
            { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
            { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
            { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
            { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
            { name: 'Onyama Limba', image: 'onyamalimba.png' },
            { name: 'Stephen Shaw', image: 'stephenshaw.png' },
            { name: 'XuXue Feng', image: 'xuxuefeng.png' }
        ];

        this.statuses = [
            { label: 'Unqualified', value: 'unqualified' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'New', value: 'new' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Renewal', value: 'renewal' },
            { label: 'Proposal', value: 'proposal' }
        ];
    }

    onSort() {
        this.updateRowGroupMetaData();
    }

    showAddGroupDialog() {
        this.addGroupDialogVisible = true;
      }
    
      // Open Add Member Dialog
      showAddMemberDialog(group: any) {
        // You can pass the group to pre-fill or identify the group
        this.addMemberDialogVisible = true;
        this.groupId = group.id
        console.log(this.groupId)
      }
    updateRowGroupMetaData() {
        this.rowGroupMetadata = {};

        if (this.customers3) {
            for (let i = 0; i < this.customers3.length; i++) {
                const rowData = this.customers3[i];
                const representativeName = rowData?.representative?.name || '';

                if (i === 0) {
                    this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
                }
                else {
                    const previousRowData = this.customers3[i - 1];
                    const previousRowGroup = previousRowData?.representative?.name;
                    if (representativeName === previousRowGroup) {
                        this.rowGroupMetadata[representativeName].size++;
                    }
                    else {
                        this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
                    }
                }
            }
        }
    }

    expandAll() {
        if (!this.isExpanded) {
            this.products.forEach(product => product && product.name ? this.expandedRows[product.name] = true : '');

        } else {
            this.expandedRows = {};
        }
        this.isExpanded = !this.isExpanded;
    }

    formatCurrency(value: number) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    searchMemberByEspritId() {
        if (this.newMember.espritId) {
          // Call your service or API to fetch member details by Esprit ID
          this.UserService.getUserByEspritId(this.newMember.espritId).then((data) => {
               console.log(data +'heree')
            if (data) {
              // Populate fields with fetched data
              this.newMember.id = data.id;
              this.newMember.name = data.name;
              this.newMember.email = data.email;
              this.newMember.role = data.role;
              this.newMember.phone = data.phone;
              this.newMember.className = data.className;
            }
            else{
                this.newMember.name = '';
                this.newMember.email = '';
                this.newMember.role = '';
                this.newMember.phone = '';
                this.newMember.className = '';
            }
          });
        }
    }

    addGroup() {
    // Validate the newGroup data if necessary
    if (this.newGroup.name && this.newGroup.projectName && this.newGroup.encadrant.name && this.newGroup.encadrant.email) {
        // Call the service to add the new group (this is where you make the API request)
        this.GroupsService.addGroup(this.newGroup).subscribe(
            (response) => {
                // If the group is successfully added, update the groups list
                this.groups.push(response);  // Add the new group to the local array

                // Close the dialog
                this.addGroupDialogVisible = false;

                // Optionally, reset the form fields
                this.newGroup = {
                    name: '',
                    projectName: '',
                    encadrant: {
                        name: '',
                        email: '',
                        role: "TEACHER",
                    }
                };
                if(this.LoggedInUserRole =='STUDENT'){
            this.GroupsService.getGroupsForGivenUser(this.LoggedInUserId).then(data => {this.groups = data; console.log(this.groups); console.log(data)});
        }
        else{
            this.GroupsService.getGroups().then(data => {this.groups = data; console.log(this.groups); console.log(data)});
        }
            },
            (error) => {
                console.error('Error adding group:', error);
                // Handle the error (e.g., show an error message to the user)
            }
        );
    } else {
        // Show validation message if any required field is missing
        console.log('Please fill all fields');
    }
}

addMember() {

    // Validate the member data
    if (this.newMember.name && this.newMember.email && this.newMember.role) {
        // Call the service to add the new member (this is where you make the API request)
        this.GroupsService.addMember(this.newMember, this.groupId ?? '').subscribe(
            (response) => {
                // If the member is successfully added, update the members list
                console.log('Member added successfully:', response);

                // Optionally, reset the form fields
                this.newMember = {
                    id : '',
                    name: '',
                    email: '',
                    role: '',
                    phone: '',
                    className: '',
                    espritId: ''
                };

                // Optionally close the dialog
                this.addMemberDialogVisible = false;
                if(this.LoggedInUserRole =='STUDENT'){
                    this.GroupsService.getGroupsForGivenUser(this.LoggedInUserId).then(data => {this.groups = data; console.log(this.groups); console.log(data)});
                }
                else{
                    this.GroupsService.getGroups().then(data => {this.groups = data; console.log(this.groups); console.log(data)});
                }
            },
            (error) => {
                console.error('Error adding member:', error);
                this.MessageService.add({ key: 'tst', severity: 'error', summary: 'Error', detail: 'User already a memeber !.' });

            }
        );
    } else {
        // Show validation message if any required field is missing
        console.log('Please fill all fields');
    }
}
deleteMember(groupId : string , memberId : string){

    this.GroupsService.deleteMember(groupId, memberId).subscribe((response) => {
                // If the member is successfully added, update the members list
                if(this.LoggedInUserRole =='STUDENT'){
                    this.GroupsService.getGroupsForGivenUser(this.LoggedInUserId).then(data => {this.groups = data; console.log(this.groups); console.log(data)});
                }
                else{
                    this.GroupsService.getGroups().then(data => {this.groups = data; console.log(this.groups); console.log(data)});
                }
            },
            (error) => {
                console.error('Error adding member:', error);
                // Handle the error (e.g., show an error message to the user)
            });
}

    async submitGeneratedGroups() {
    try {
        const generatedGroups: any[][] = await this.UserService.generateGroups(this.groupClass);

        // Flatten all generated members into one list
        const allGeneratedMembers = generatedGroups.flat().filter(m => m);
        const groups: Group[] = this.groups;
        const emptyGroups = groups.filter(g => !g.members || g.members.length === 0);

        if (emptyGroups.length === 0) {
        window.alert("⚠️ There are no empty groups to assign members.");
        this.MessageService.add({ key: 'tst', severity: 'error', summary: 'warning', detail: '⚠️ There are no empty groups to assign members.' });
        return;
        }

        if (allGeneratedMembers.length === 0) {
        window.alert("⚠️ No members were generated.");
        return;
        }

        if (emptyGroups.length < generatedGroups.length) {
        const confirmProceed = window.confirm(
            `You have only ${emptyGroups.length} empty groups but ${generatedGroups.length} generated member lists.\n` +
            `Proceed with assigning all members to the available groups anyway?`
        );
        if (!confirmProceed) {
            return;
        }
        }

        let memberIndex = 0;
        const membersPerGroup = Math.ceil(allGeneratedMembers.length / emptyGroups.length);
        this.feedbackResults = []; // Clear previous results

        for (const group of emptyGroups) {
        const membersForGroup = allGeneratedMembers.slice(memberIndex, memberIndex + membersPerGroup);

        for (const memberData of membersForGroup) {
            const isAlreadyInClassGroup = groups.some(g =>
            g.members?.some(m => m.email === memberData.email && m.className === memberData.className)
            );

            if (isAlreadyInClassGroup) {
            this.feedbackResults.push({
                success: false,
                message: `❌ Skipping ${memberData.name} - already in a group with class ${memberData.className}.`
            });
            continue;
            }

            this.newMember = {
            id: memberData.id,
            name: memberData.name,
            email: memberData.email,
            role: memberData.role,
            phone: memberData.phone || '',
            className: memberData.className || '',
            espritId: memberData.espritId || ''
            };

            await new Promise((resolve) => {
            this.GroupsService.addMember(this.newMember, group.id ?? '').subscribe({
                next: (res) => {
                this.feedbackResults.push({
                    success: true,
                    message: `✅ Added ${this.newMember.name} to ${group.name}`
                });
                resolve(res);
                },
                error: (err) => {
                this.feedbackResults.push({
                    success: false,
                    message: `❌ Failed to add ${this.newMember.name} to ${group.name}`
                });
                resolve(null);
                }
            });
            });
        }

        memberIndex += membersPerGroup;

        if (memberIndex >= allGeneratedMembers.length) {
            break;
        }
        }

        this.groups = await this.GroupsService.getGroups();
        this.generateGroupsDialogVisible = false;
        this.feedbackDialogVisible = true; // Show popup with all results

    } catch (error) {
        console.error('Error generating and assigning groups:', error);
        window.alert(' Something went wrong during group generation.');
    }
}

}





    